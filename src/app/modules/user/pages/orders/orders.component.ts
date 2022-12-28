import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/modules/_shared/models/cart.model';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  carts: Cart[];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCarts();
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
}
