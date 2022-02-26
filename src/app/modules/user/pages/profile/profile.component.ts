import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FiltersProducts } from 'src/app/modules/_shared/models/filtersProducts.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private readonly notifier: NotifierService;
  productsArt = [];
  productsMens = [];
  productsWomens = [];
  productsKids = [];
  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }

  carouselMultipleOptions2: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }

  carouselMultipleOptions3: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }
  quantity = 1;
  user: User;
  currentUser: User;
  users: User[];
  id: number;
  catalogType: string;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params);
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.catalogType = params['catalogType']; // (+) converts string 'id' to a number
      this.getUsers(this.id);
      // In a real app: dispatch action to load the details here.
    });
    this.getProducts();
  }

  isMyProfile() {
    return this.currentUser.id === this.id;
  }

  getUsers(id?) {
    this.userService.getUsers().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(users => {
      if (id) {
        this.user = users.filter(user => user.id === id)[0];
      }
      this.users = users;
    })
  }

  getProducts() {
    this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.productsArt = products.filter(product => product.sellerId === this.user.id && product.catalogType === 'art');
      this.productsMens = products.filter(product => product.sellerId === this.user.id && product.kind === 'mens');
      this.productsWomens = products.filter(product => product.sellerId === this.user.id && product.kind === 'womens');
      this.productsKids = products.filter(product => product.sellerId === this.user.id && product.kind === 'kids');
    })
  }

  trackById(index, item) {
    return item.id;
  }

  followProfile(user) {
    console.log('user', user);
    this.notifier.notify('success', `Vous êtes maintenant abonné au profil de ${user.firstname}`)
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isCatalogArt() {
    return this.catalogType === 'art';
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
