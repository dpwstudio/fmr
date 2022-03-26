import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() product: Product;
  @Input() productId: number;
  quantity = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isFallingPrice(product: Product) {
    return product.fallingPrice > 0;
  }

}
