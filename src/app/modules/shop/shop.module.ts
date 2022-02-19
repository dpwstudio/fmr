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
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShopComponent,
    CategoriesComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    PaymentStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    CarouselModule,
    IonicModule
  ]
})
export class ShopModule { }
