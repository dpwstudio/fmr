import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { UploadImageService } from 'src/app/modules/_shared/services/upload-image/upload-image.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private readonly notifier: NotifierService;
  currentUser: User;
  editImgForm: FormGroup;
  editDeliveryAddressForm: FormGroup;
  editBillingAddressForm: FormGroup;
  editInfosForm: FormGroup;
  editPasswordForm: FormGroup;
  subscription: Subscription;
  deliveryAddress = {
    address: '',
    zipCode: '',
    city: '',
    country: ''
  }
  billingAddress = {
    address: '',
    zipCode: '',
    city: '',
    country: ''
  }
  img = {
    avatarSrc: '',
  }
  countries: Country[];



  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private uploadImageService: UploadImageService,
    private http: HttpClient,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getCountriesSelectBox();
    this.editImgForm = this.formBuilder.group({
      avatarUploaded: [""],
      avatar: [""],
    });

    this.editDeliveryAddressForm = this.formBuilder.group({
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.editBillingAddressForm = this.formBuilder.group({
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.editInfosForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.editPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    if (this.currentUser.deliveryAddress) {
      this.deliveryAddress = JSON.parse(this.currentUser.deliveryAddress)[0];
      this.editDeliveryAddressForm.patchValue({
        address: this.deliveryAddress.address,
        zipCode: this.deliveryAddress.zipCode,
        city: this.deliveryAddress.city,
        country: this.deliveryAddress.country
      });
    }
    if (this.currentUser.billingAddress) {
      this.billingAddress = JSON.parse(this.currentUser.billingAddress)[0];
      this.editBillingAddressForm.patchValue({
        address: this.billingAddress.address,
        zipCode: this.billingAddress.zipCode,
        city: this.billingAddress.city,
        country: this.billingAddress.country
      });
    }
    this.editInfosForm.patchValue({
      lastname: this.currentUser.lastname,
      firstname: this.currentUser.firstname,
      phone: this.currentUser.phone
    });
    this.getUser(this.currentUser.id)
  }

  onPhotoSelect(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    console.log('file', file)
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.editImgForm.get('avatarUploaded').setValue(file);
        this.editImgForm.get('avatar').setValue(file.name);
        this.img.avatarSrc = reader.result as string;
      };
    }
  }

  /**
   * Récupère l'image du profil
   * @param user
   * @returns 
   */
  getUserImgProfile(user) {
    return this.userService.getUserImgProfile(user).avatar;
  }

  refresh(): void {
    window.location.reload();
  }

  getCountriesSelectBox() {
    return this.http.get('assets/mock-data/countries.json').subscribe((countries: Country[]) => {
      this.countries = countries;
    });
  }

  /**
   * Modifie l'image de profil
   * @returns
   */
  editImgProfile() {
    // stop here if form is invalid
    if (this.editImgForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('uploadedImg', this.editImgForm.get('avatarUploaded').value);
    formData.append('agentId', '007');

    this.subscription = this.userService.editImg(this.editImgForm.value, 'avatar', this.currentUser.id).pipe(
      catchError(error => {
        this.notifier.notify('error', error.message)
        return throwError(error);
      })
    ).subscribe(res => {
      this.uploadImageService.sendPhotoToServer(formData);
      this.getUser(this.currentUser.id);
      this.notifier.notify('success', 'L\'image de profil a bien été mise à jour.');
    });
  }

  /**
   * Modifie l'adresse de livraison
   * @returns
   */
  editDeliveryAddress() {
    // stop here if form is invalid
    if (this.editDeliveryAddressForm.invalid) {
      this.notifier.notify('error', 'L\'adresse de livraison est incomplète');
      return;
    }

    this.subscription = this.userService.editAddress(this.editDeliveryAddressForm.value, 'deliveryAddress', this.currentUser.id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
      this.refresh();
      this.getUser(this.currentUser.id);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notifier.notify('success', 'L\'adresse de livraison a été mis à jour avec succès.');
    });
  }

  /**
   * Modifie l'adresse de facturation
   * @returns
   */
  editBillingAddress() {
    // stop here if form is invalid
    if (this.editBillingAddressForm.invalid) {
      this.notifier.notify('error', 'L\'adresse de facturation est incomplète');
      return;
    }

    this.subscription = this.userService.editAddress(this.editBillingAddressForm.value, 'billingAddress', this.currentUser.id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
      this.refresh();
      this.getUser(this.currentUser.id);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notifier.notify('success', 'L\'adresse de facturation a été mis à jour avec succès.');
    })
  }

  /**
   * Modifie les informations personnelles
   * @returns success
   */
  editInfos() {
    // stop here if form is invalid
    if (this.editInfosForm.invalid) {
      this.notifier.notify('error', 'Veuillez vérifier que toutes les informations sont bien saisies');
      return;
    }

    this.subscription = this.userService.editUserInfos(this.editInfosForm.value, this.currentUser.id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
      this.refresh();
      this.getUser(this.currentUser.id);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notifier.notify('success', 'Vos informations on bien été mises à jour.');
    });
  }


  /**
   * Modifie le mot de passe
   * @returns 
   */
  editPassword() {
    // stop here if form is invalid
    if (this.editPasswordForm.invalid) {
      this.notifier.notify('error', 'Veuillez saisir le nouveau mot de passe.');
      return;
    }
    if (this.editPasswordForm.value.password !== this.editPasswordForm.value.confirmPassword) {
      this.notifier.notify('error', 'Les mots de passe sont différents.');
      return;
    }

    const body = {
      password: this.editPasswordForm.value.password,
      email: this.currentUser.email
    }

    this.subscription = this.authService.resetPassword(body).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
      this.refresh();
      this.getUser(this.currentUser.id);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notifier.notify('success', 'Le mot de passe a été modifié avec succès.');
    })
  }

  /**
   * Récupére l'utilisateur courant
   * @param id
   */
  getUser(id) {
    console.log('id', id)
    this.subscription = this.userService.getUser(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(user => {
      if (id) {
        this.currentUser = user.filter(user => user.id === id)[0];
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
    });
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout() {
    this.authService.logout();
    this.notifier.notify('success', 'Vous êtes déconnecté')
    this.router.navigate(['/login']);
  }
}
