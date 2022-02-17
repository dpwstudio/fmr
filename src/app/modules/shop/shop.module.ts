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


@NgModule({
  declarations: [
    ShopComponent,
    CategoriesComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    CarouselModule,
    IonicModule
  ]
})
export class ShopModule { }
