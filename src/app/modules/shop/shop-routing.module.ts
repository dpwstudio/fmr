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
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    data: {
      title: 'Détail de l\'article'
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
      title: 'Panier'
    }
  }, {
    path: 'delivery',
    component: DeliveryComponent,
    data: {
      title: 'Livraison'
    }
  }, {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
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
