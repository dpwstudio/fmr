import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/_shared/models/product.model';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';

@Component({
  selector: 'app-card-product-user',
  templateUrl: './card-product-user.component.html',
  styleUrls: ['./card-product-user.component.scss']
})
export class CardProductUserComponent implements OnInit {
  @Input() product: Product;
  quantity = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isFallingPrice(product: Product) {
    return product.amount.fallingPrice > 0;
  }
}
