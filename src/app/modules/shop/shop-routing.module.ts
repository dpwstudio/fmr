import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_shared/guard/auth/auth.guard';
import { NegociateComponent } from './components/negociate/negociate.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      title: 'Catégories',
      animationState: 'One'
    }
  }, {
    path: 'shop',
    component: ShopComponent,
    data: {
      title: 'Shop',
      animationState: 'Two'
    }
  }, {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    data: {
      title: 'Détail de l\'article',
      animationState: 'Three'
    }
  },
  {
    path: 'negociate/:id',
    component: NegociateComponent,
    data: {
      title: 'Négocier'
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {
      title: 'Panier',
      animationState: 'One'
    }
  }, {
    path: 'delivery',
    component: DeliveryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Livraison',
      animationState: 'Two'
    }
  }, {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Checkout',
      animationState: 'Three'
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
