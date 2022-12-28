import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
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
  productsDressingUser: Product[] = [];
  productsGalleryUser: Product[] = [];
  productsFallingPriceMode: Product[] = [];
  productsArt: Product[] = [];
  productsFallingPriceArt: Product[] = [];
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
    dots: false,
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
    const filtersProducts: FiltersProducts = {
      startDate: moment().subtract(5, 'days').format(),
      endDate: moment().format()
    }
    this.getCategories();
    this.getProductsOnLast5Days(filtersProducts);
    this.getProductsWithFallingPrice();
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

  getProductsOnLast5Days(filters) {
    this.subscription = this.productService.getProducts(filters).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.productsMode = products.filter(product => product.catalogType === 'mode');
      console.log('products', products);
      this.productsArt = products.filter(product => product.catalogType === 'art');
    })
  }

  getProductsWithFallingPrice() {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.productsFallingPriceMode = products.filter(product => product.catalogType === 'mode' && product.fallingPrice > 0);
      this.productsFallingPriceArt = products.filter(product => product.catalogType === 'art' && product.fallingPrice > 0);
    })

  }

  getUsers() {
    this.subscription = this.userService.getUsers().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(users => {
      this.users = users;
    });
  }

  getProducts() {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.productsDressingUser = products;
      this.productsGalleryUser = products;
    })
  }

  getProductsDressingUser(id) {
    return this.productsDressingUser.filter(product => product.userId === id && product.catalogType === 'mode');
  }
  
  getProductsGalleryUser(id) {
    return this.productsGalleryUser.filter(product => product.userId === id && product.catalogType === 'art');
  }

  getProductPerUser(id): Product[] {
    return this.productsDressingUser.filter(product => product.userId === id);
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  isFallingPrice(product: Product) {
    return product.fallingPrice > 0;
  }

}
