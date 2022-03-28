import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  private readonly notifier: NotifierService;
  @Input() product: Product;
  @Input() productId: number;
  quantity = 1;
  loves: any[] = [];
  currentUser: User;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getLoves();
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isFallingPrice(product: Product) {
    return product.fallingPrice > 0;
  }

  getLoves() {
    this.productService.getLoves(this.productId).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(loves => {
      this.loves = loves;
    })
  }

  loveProduct(product, userId) {
    const data = {
      productId: product.id,
      userId: userId
    }

    this.productService.loveProduct(data).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.notifier.notify('error', 'Vous aimez déjà ce produit')
        }
        return throwError(error);
      })
    ).subscribe(result => {
      this.notifier.notify('info', 'Vous aimez cette article ? Acheter le avant qu\'il ne soit trop tard !');
      this.getLoves();
    })
  }

  hasAlreadyLove(userId) {
    return this.loves.filter(love => love.userId === userId).length > 0;
  }

}
