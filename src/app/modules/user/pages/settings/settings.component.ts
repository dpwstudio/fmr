import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private readonly notifier: NotifierService;
  currentUser: User;
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
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
    console.log('user', this.deliveryAddress);
    this.getCurrentUserImgProfile()
  }

  getCurrentUserImgProfile() {
    let imgProfile = '';
    if (this.currentUser.img) {
      imgProfile = this.currentUser.img.avatar;
    } else {
      imgProfile = 'assets/img/default-img.svg';
    }
    return imgProfile;
  }

  editDeliveryAddress() {
    // stop here if form is invalid
    if (this.editDeliveryAddressForm.invalid) {
      this.notifier.notify('error', 'L\'adresse de livraison est incomplète');
      return;
    }

    this.subscription = this.userService.editAddress(this.editDeliveryAddressForm.value, 'deliveryAddress').pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
      this.notifier.notify('success', 'L\'adresse de livraison a été mis à jour avec succès.');
      this.getUser(this.currentUser.id);
    })
  }

  editBillingAddress() {
    // stop here if form is invalid
    if (this.editBillingAddressForm.invalid) {
      this.notifier.notify('error', 'L\'adresse de facturation est incomplète');
      return;
    }

    this.subscription = this.userService.editAddress(this.editBillingAddressForm.value, 'billingAddress').pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
      this.notifier.notify('success', 'L\'adresse de facturation a été mis à jour avec succès.');
      this.getUser(this.currentUser.id);
    })
  }

  editInfos() {
    // stop here if form is invalid
    if (this.editInfosForm.invalid) {
      this.notifier.notify('error', 'Veuillez vérifier que toutes les informations sont bien saisies');
      return;
    }

    this.subscription = this.userService.editUserInfos(this.editInfosForm.value).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
      this.notifier.notify('success', 'Vos informations on bien été mises à jour.');
      this.getUser(this.currentUser.id);
    });
  }

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
      this.notifier.notify('success', 'Le mot de passe a été modifié avec succès.');
      this.getUser(this.currentUser.id);
    })
  }

  getUser(id) {
    this.userService.getUser(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(user => {
      console.log('user', user);
      localStorage.setItem('currentUser', JSON.stringify(user[0]));
      this.authService.currentUserSubject.next(user[0]);
    })
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  logout() {
    this.authService.logout();
    this.notifier.notify('success', 'Vous êtes déconnecté')
    this.router.navigate(['/login']);
  }
}
