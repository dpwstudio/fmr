import { Injectable, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Cart } from '../../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly notifier: NotifierService;
  cartProductList: Cart[] = [];

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
    const tmpCart = JSON.parse(localStorage.getItem('tmpCart'));
    if (!tmpCart) {
      localStorage.setItem('tmpCart', JSON.stringify([]));
    }
    this.cartProductList = JSON.parse(localStorage.getItem('tmpCart'));
  }

  getTotalCurrentCart() {
    return this.cartProductList.length;
  }

  addProductToCart(product) {
    console.log('product', product);
    const productExistInCart = this.cartProductList.find(cart => cart.id === product.id); // find product by name
    if (!productExistInCart) {
      this.cartProductList.push({
        id: product.id,
        brand: product.brand,
        model: product.model,
        photoFace: product.photoFace,
        quantity: product.quantity,
        price: product.price,
        userId: product.userId
      }); // enhance "product" object with "quantity" property
      localStorage.setItem('tmpCart', JSON.stringify(this.cartProductList));
      this.notifier.notify('success', 'L\'article a été ajouté dans votre panier');
      return;
    } else {
      this.notifier.notify('error', 'L\'article est déjà dans votre panier');
    }
  }

  removeProduct(product) {
    this.cartProductList = this.cartProductList.filter(cart => cart.brand !== product.brand);
  }

  removeCart() {
    localStorage.setItem('tmpCart', JSON.stringify([]));
    this.cartProductList = JSON.parse(localStorage.getItem('tmpCart'));
  }

}
