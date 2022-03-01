import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/modules/_shared/models/cart.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  carts: Cart[];
  currentUser: User;
  public href: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.router.url);
    this.getCarts();
  }

  isUserConnected() {
    return this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
    // this.notifier.notify('success', 'Vous êtes déconnecté')
    this.router.navigate(["/login"]);
  }

  getCarts() {
    this.carts = this.cartService.cartProductList;
  }

  getTotalTTC() {
    return this.carts.reduce((acc, product) => acc = acc + (product.amount.price * product.quantity), 0);
  }

}
