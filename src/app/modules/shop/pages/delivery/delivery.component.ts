import { DOCUMENT } from '@angular/common';
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

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  private readonly notifier: NotifierService;
  showLoading = false;
  currentUser: User;
  editDeliveryAddressForm: FormGroup;
  editBillingAddressForm: FormGroup;
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
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
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
  }

  gotoCheckout(deliveryAddress, billingAddress) {
    console.log('deliveryAddress', deliveryAddress)
    console.log('billingAddress', billingAddress)
    if (deliveryAddress.address && billingAddress.address) {
      this.router.navigate(['checkout']);
    } else {
      this.notifier.notify('error', 'Veuillez compléter vos adresses.');
    }
  }

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
      this.notifier.notify('success', 'L\'adresse de livraison a été mis à jour avec succès.');
      this.getUser(this.currentUser.id);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.refresh();
    })
  }

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
      this.notifier.notify('success', 'L\'adresse de facturation a été mis à jour avec succès.');
      this.getUser(this.currentUser.id);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.refresh();
    })
  }

  getUser(id) {
    this.subscription = this.userService.getUser(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(user => {
      console.log('user', user);
      localStorage.setItem('currentUser', JSON.stringify(user[0]));
    });
  }

  refresh(): void {
    window.location.reload();
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }
}
