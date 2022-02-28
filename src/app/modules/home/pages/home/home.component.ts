import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FiltersProducts } from 'src/app/modules/_shared/models/filtersProducts.model';
import { Product } from 'src/app/modules/_shared/models/product.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = [];
  productsMode: Product[] = [];
  productsArt: Product[] = [];
  carouselFullOptions: OwlOptions = {
    loop: true,
    margin: 8,
    nav: false,
    items: 1,
    dots: false,
    autoplay: true
  };
  carouselSingleOptions: OwlOptions = {
    stagePadding: 30,
    loop: true,
    margin: 16,
    nav: false,
    items: 1,
    dots: true,
    autoplay: true,
  }

  carouselSmallOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 8,
    nav: false,
    items: 4,
    dots: false,
  }

  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }
  quantity = 1;
  subscription: Subscription;
  filtersProducts: FiltersProducts;
  users: User[];

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.getUsers();
  }

  getCategories() {
    this.subscription = this.productService.getCategories().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(categories => {
      this.categories = categories;
    })
  }

  trackById(index, item) {
    return item.id;
  }

  getProducts() {
    this.subscription = this.productService.getProducts(this.filtersProducts).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.productsMode = products.filter(product => product.catalogType === 'mode');
      this.productsArt = products.filter(product => product.catalogType === 'art');
    })
  }

  getUsers() {
    this.subscription = this.userService.getUsers().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(users => {
      this.users = users;
    })
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

}
