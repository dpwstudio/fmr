import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './pages/shop/shop.component';
import { IonicModule } from '@ionic/angular';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { SharedModule } from '../_shared/shared.module';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NegociateComponent } from './components/negociate/negociate.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    ShopComponent,
    CategoriesComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    PaymentStatusComponent,
    DeliveryComponent,
    NegociateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    ShopRoutingModule,
    CarouselModule,
    IonicModule
  ]
})
export class ShopModule { }
