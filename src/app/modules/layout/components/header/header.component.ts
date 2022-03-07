import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from 'src/app/modules/_shared/models/cart.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  carts: Cart[];
  currentUser: User;
  public href: string = "";
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.href = this.router.url;
    this.getCarts();
    this.currentUser = this.authService.getCurrentUser();
  }

  getUserImgProfile(user) {
    return this.userService.getUserImgProfile(user).avatar;
  }

  isUserConnected() {
    return this.currentUser;
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
