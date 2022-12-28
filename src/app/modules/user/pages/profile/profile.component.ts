import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  img = {
    dressingSrc: '',
    gallerySrc: '',
  }
  subscription: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.catalogType = params['catalogType']; // (+) converts string 'id' to a number
      this.getUser(this.id);
      // In a real app: dispatch action to load the details here.
    });

    this.getProducts();
  }

  isMyProfile() {
    return this.authService.getCurrentUser().id === this.id;
  }

  /**
   * Récupère l'image du profil
   * @param user
   * @returns 
   */
  getUserImgProfile(user) {
    return this.userService.getUserImgProfile(user).avatar;
  }

  getUser(id) {
    this.userService.getUser(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(users => {
      if (id) {
        this.user = users.filter(user => user.id === id)[0];
        console.log('this.user', this.user);
      }
      console.log('users', users);
    });
  }

  getProducts() {
    this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      if (this.user) {
        this.productsArt = products.filter(product => product.userId === this.user.id && product.catalogType === 'art');
        this.productsMens = products.filter(product => product.userId === this.user.id && product.kind === 'mens');
        this.productsWomens = products.filter(product => product.userId === this.user.id && product.kind === 'womens');
        this.productsKids = products.filter(product => product.userId === this.user.id && product.kind === 'kids');
      }
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
