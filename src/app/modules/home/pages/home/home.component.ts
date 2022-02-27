import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FiltersProducts } from 'src/app/modules/_shared/models/filtersProducts.model';
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
  products = [];
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
      this.products = products;
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

  image3 = 'assets/img/slide/slide1.png';
  image4 = 'assets/img/slide/slide1.png';
  image41 = 'assets/img/slide/slide1.png';
  image5 = 'assets/img/slide/slide1.png';
  image6 = '/assets/Avengers6.jpg';
  image61 = '/assets/Avengers61.jpg';
  image7 = '/assets/Avengers7.jpg';
  image71 = '/assets/Avengers71.png';
  image51 = '/assets/Avengers51.jpg';
  image8 = '/assets/Avengers8.jpg';

  onImageSwitch() {
    this.image3 = this.image8;
  }
  onImageSetSwitch() {
    this.image6 = this.image61;
    this.image7 = this.image71;
  }

  onPictureSwitch() {
    this.image4 = this.image41;
    this.image5 = this.image51;
  }

}
