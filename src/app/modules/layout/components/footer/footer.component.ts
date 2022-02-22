import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  isUserConnected() {
    return this.authService.currentUserValue;
  }

  getTotalCurrentCart() {
    return this.cartService.cartProductList.length;
  }
}
