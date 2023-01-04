import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from 'src/app/modules/_shared/models/cart.model';
import { Order } from 'src/app/modules/_shared/models/order.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { OrderService } from 'src/app/modules/_shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  carts: Cart[];
  ordersPending: Order[] = [];
  ordersShipping: Order[] = [];
  ordersDelivered: Order[] = [];
  currentUser: User;

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getCarts();
    this.getOrders(this.currentUser.id);
  }

  trackById(index, item) {
    return item.id;
  }

  goto(product) {
    this.router.navigate(['/product-detail', product.product.id]);
  }

  getCarts() {
    this.carts = this.cartService.cartProductList;
  }

  getOrders(id) {
    this.orderService.getOrdersByUser(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(orders => {
      this.ordersPending = orders.filter(order => order.status === 'pending');
      this.ordersShipping = orders.filter(order => order.status === 'shipping');
      this.ordersDelivered = orders.filter(order => order.status === 'delivered');
    });
  }

  getProductPhoto(carts) {
    return JSON.parse(carts)[0].photoFace;
  }

  getProductBrand(carts) {
    return JSON.parse(carts)[0].brand;
  }

  getProductName(carts) {
    return JSON.parse(carts)[0].model;
  }
}
