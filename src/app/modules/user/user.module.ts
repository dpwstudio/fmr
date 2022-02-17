import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { FormAddressDeliveryComponent } from './components/form-address-delivery/form-address-delivery.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    FormAddressDeliveryComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UserRoutingModule,
    IonicModule
  ]
})
export class UserModule { }
