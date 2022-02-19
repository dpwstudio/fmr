import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent,
    data: {
      title: 'Shop'
    }
  }, {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      title: 'Catégories'
    }
  }, {
    path: 'product-detail',
    component: ProductDetailComponent,
    data: {
      title: 'Détail de l\'article'
    }
  }, {
    path: 'cart',
    component: CartComponent,
    data: {
      title: 'Panier'
    }
  }, {
    path: 'checkout',
    component: CheckoutComponent,
    data: {
      title: 'Checkout'
    }
  }, {
    path: 'payment-status',
    component: PaymentStatusComponent,
    data: {
      title: 'Payment-status'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
