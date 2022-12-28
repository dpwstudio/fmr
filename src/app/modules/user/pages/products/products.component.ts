import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private readonly notifier: NotifierService;
  productsArt = [];
  productsMens = [];
  productsWomens = [];
  productsKids = [];
  quantity = 1;
  currentUser: User;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('this.currentUSer', this.currentUser);
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      if (this.currentUser) {
        this.productsArt = products.filter(product => product.userId === this.currentUser.id && product.catalogType === 'art');
        this.productsMens = products.filter(product => product.userId === this.currentUser.id && product.kind === 'mens');
        this.productsWomens = products.filter(product => product.userId === this.currentUser.id && product.kind === 'womens');
        this.productsKids = products.filter(product => product.userId === this.currentUser.id && product.kind === 'kids');
      }
    })
  }

  trackById(index, item) {
    return item.id;
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isKindMens(product) {
    return product.kind === 'mens';
  }

  isKindWomens(product) {
    return product.kind === 'womens';
  }

  isKindKids(product) {
    return product.kind === 'kids';
  }

  isArtProduct(product) {
    return product.category === 'art';
  }

}
