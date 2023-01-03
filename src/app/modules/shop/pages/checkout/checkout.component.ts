import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { first } from 'rxjs/operators';
import { Cart } from 'src/app/modules/_shared/models/cart.model';
import { Order } from 'src/app/modules/_shared/models/order.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { EmailService } from 'src/app/modules/_shared/services/email/email.service';
import { OrderService } from 'src/app/modules/_shared/services/order/order.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { europe, outreMer, shippingFees } from 'src/config/constant';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  recto = true;
  verso = false;
  showLoading = false;
  carts: Cart[];
  order: Order;
  currentUser: User;
  private readonly notifier: NotifierService;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private emailService: EmailService,
    private productService: ProductService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getCarts();
  }

  turnCard(type: string) {
    if (type === 'recto') {
      this.recto = true;
      this.verso = false;
    } else {
      this.recto = false;
      this.verso = true;
    }
  }

  getCarts() {
    this.carts = this.cartService.cartProductList;
    console.log('this.carts', this.carts);
  }

  getTotalTTC() {
    return this.carts.reduce((acc, product) => acc = acc + (product.price * product.quantity), 0);
  }

  getShippingFees() {
    if (!this.currentUser.deliveryAddress) {
      return 15;
    } else {
      const deliveryAddress = JSON.parse(this.currentUser.deliveryAddress)[0];
      if (deliveryAddress.country === 'France') {
        return shippingFees.france;
      } else if (outreMer.indexOf(deliveryAddress.country) > -1) {
        return shippingFees.outreMer;
      } else if (europe.indexOf(deliveryAddress.country) > -1) {
        return shippingFees.europe;
      } else {
        return shippingFees.international;
      }
    }
  }

  processPayment(carts) {
    console.log('carts', carts);
    this.showLoading = true;
    const { id, firstname, email, lastname, deliveryAddress } = this.currentUser;

    if (carts.length > 0) {
      this.order = {
        clientName: firstname + ' ' + lastname,
        email: email,
        localization: deliveryAddress,
        total: this.getTotalTTC(),
        shippingFees: this.getShippingFees(),
        carts: JSON.stringify(carts),
        status: 'pending',
        userId: id
      }

      console.log('this.order', this.order)
      this.orderService.createOrder(this.order).pipe(first())
        .subscribe(
          res => {
            this.showLoading = false;
            this.router.navigate(['payment-status']);
            this.notifier.notify('success', 'Votre paiement a été accepté.');
            this.editStatusProduct(true, carts);
            // this.emailService.sendEmailToNewOrder(this.order).subscribe(data => console.log('data', data));
            this.cartService.removeCart();
          },
          error => {
            this.notifier.notify('error', error.message)
          });
    } else {
      this.notifier.notify('error', 'Votre panier est vide.')
    }
  }

  editStatusProduct(status: boolean, carts) {
    if (!status) {
      return;
    } else {
      carts.forEach(cart => {
        const product = {
          status: 'selled',
          id: cart.id
        };
        this.productService.editProduct(product).subscribe(res => this.notifier.notify('success', 'produit modifié'));
      })
    }
  }
}
