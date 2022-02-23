import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/modules/shared/models/cart.model';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';

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

  constructor(private router: Router, private cartService: CartService) { }

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
  }

  getTotalTTC() {
    return this.carts.reduce((acc, product) => acc = acc + (product.amount.price * product.quantity), 0);
  }



  processPayment() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
      this.router.navigate(['payment-status']);
    }, 2000)
  }
}
