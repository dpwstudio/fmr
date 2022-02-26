import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Cart } from 'src/app/modules/_shared/models/cart.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private readonly notifier: NotifierService;
  carts: Cart[];
  p: number = 1;
  numberPerPage = 6;
  quantity: number;
  currentUser: User;

  constructor(
    private router: Router,
    public authService: AuthService,
    private cartService: CartService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    if (this.authService.currentUser) {
      this.authService.currentUser.subscribe(x => {
        if (this.currentUser) {
          this.currentUser = x[0]
        }
      });
    }
  }

  isLoggedIn() {
    return this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() {
    this.carts = this.cartService.cartProductList;
  }

  trackById(index, item) {
    return item.id;
  }

  getTotalTTC() {
    return this.carts.reduce((acc, product) => acc = acc + (product.amount.price * product.quantity), 0);
  }

  confirmCart() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/delivery']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  removeProduct(product) {
    product.quantity = 0;
    if (product.quantity === 0) {
      this.cartService.removeProduct(product);
    }
    this.notifier.notify('success', 'L\'article a bien été supprimé du panier.');
    this.carts = this.cartService.cartProductList;
    localStorage.setItem('tmpCart', JSON.stringify(this.carts))
  }

  getTotalCurrentCart() {
    return this.cartService.cartProductList.length;
  }

}
