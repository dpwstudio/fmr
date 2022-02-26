import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { FormAddressDeliveryComponent } from './components/form-address-delivery/form-address-delivery.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../_shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FormAddressDeliveryComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SettingsComponent,
    NotificationsComponent,
    ResetPasswordComponent,
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CarouselModule,
    UserRoutingModule,
    IonicModule
  ]
})
export class UserModule { }
