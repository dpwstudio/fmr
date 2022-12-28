import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { first } from 'rxjs/operators';
import { Cart } from 'src/app/modules/_shared/models/cart.model';
import { Order } from 'src/app/modules/_shared/models/order.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { EmailService } from 'src/app/modules/_shared/services/email/email.service';
import { OrderService } from 'src/app/modules/_shared/services/order/order.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  currentUser: User;
  private readonly notifier: NotifierService;
  carts: Cart[];
  order: Order;

  constructor( 
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private emailService: EmailService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {

  }

  getTotalTTC() {
    return this.carts.reduce((acc, product) => acc = acc + (product.price * product.quantity), 0)
  }


  createOrders(carts) {
    const { id, firstname, email, lastname, billingAddress } = this.currentUser;
    if (carts.length > 0) {
      this.order = {
        clientName: firstname + ' ' + lastname,
        email: email,
        localization: billingAddress,
        total: this.getTotalTTC(),
        carts: JSON.stringify(carts),
        status: 'pending',
        userId: id
      }
      this.orderService.createOrder(this.order).pipe(first())
        .subscribe(
          res => {
            this.notifier.notify('success', 'Votre paiement a été accepté.');
            this.emailService.sendEmailToNewOrder(this.order).subscribe(data => console.log('data', data));
            this.cartService.removeCart();
          },
          error => {
            this.notifier.notify('error', error.message)
          });
    } else {
      this.notifier.notify('error', 'Votre panier est vide.')
    }
  }

}
