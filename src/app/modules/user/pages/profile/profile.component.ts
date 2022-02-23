import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private readonly notifier: NotifierService;
  products = [];
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

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.products = products.filter(product => product.sellerName === 'Ava');
    })
  }

  shareProfile() {
    const navigator = window.navigator as any;

    if (navigator.share) {
      navigator
        .share({
          title: 'FMR Store',
          text: 'Pop-up store',
          url: 'https://lumiaouvertures.fr/fmr'
        })
        .then(() => console.log('Successful share'))
        .catch((error: any) => console.log('Error sharing', error));
    } else {
      alert('share not supported');
    }
  }

  gotoProduct(product) {
    return this.router.navigateByUrl(product.url, { state: product });
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
