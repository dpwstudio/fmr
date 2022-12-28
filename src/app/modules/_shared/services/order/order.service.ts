import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { AuthService } from '../auth/auth.service';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentUser: User;
  stripePromise = loadStripe(environment.stripeKeyTest);
  priceId = 'price_1I1rvyK20tky2hQ75I3y8e85';
  priceId2 = 'price_1I1ryOK20tky2hQ7p4qaFWeW';
  quantity = 1;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  createOrder(order: Order) {
    return this.http.post(`${environment.fmrApi}/orders`, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(`${environment.fmrApi}/orders`) as Observable<Order[]>;
  }

  getOrdersByUser(userId): Observable<Order[]> {
    return this.http.get(`${environment.fmrApi}/orders/user/${userId}`) as Observable<Order[]>;
  }

  editOrder(id, status) {
    return this.http.put(`${environment.fmrApi}/orders/${id}`, status);
  }

  deleteOrder(id) {
    return this.http.delete(`${environment.fmrApi}/orders/${id}`);
  }

  async paidWithCreditCard(carts) {
    // Call your backend to create the Checkout session.
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      customerEmail: this.currentUser.email,
      lineItems: [{ price: this.priceId, quantity: this.quantity }, { price: this.priceId2, quantity: this.quantity }],
      successUrl: `${window.location.origin}/#/payment-status`,
      cancelUrl: `${window.location.origin}/#/order-cancelled`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }
  }
}
