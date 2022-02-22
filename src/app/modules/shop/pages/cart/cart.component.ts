import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/modules/shared/models/cart.model';
import { User } from 'src/app/modules/shared/models/user.model';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts: Cart[];
  p: number = 1;
  numberPerPage = 6;
  quantity: number;
  currentUser: User;

  constructor(
    private router: Router,
    public authService: AuthService,
    private cartService: CartService
  ) {
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

  getTotalTTC() {
    return this.carts.reduce((acc, product) => acc = acc + (product.amount * product.quantity), 0);
  }

  confirmCart() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/delivery']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  increment(cart) {
    cart.quantity++;
    if (cart.quantity === 8) {
      return;
    }
    this.carts = this.cartService.cartProductList;
    localStorage.setItem('tmpCart', JSON.stringify(this.carts))
  }

  decrement(cart) {
    cart.quantity--;
    if (cart.quantity === 0) {
      this.cartService.removeProduct(cart);
    }
    this.carts = this.cartService.cartProductList;
    localStorage.setItem('tmpCart', JSON.stringify(this.carts))
  }

  getTotalCurrentCart() {
    return this.cartService.cartProductList.length;
  }

}
