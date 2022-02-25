import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/modules/shared/models/product.model';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  carouselFullOptions: OwlOptions = {
    loop: true,
    margin: 8,
    nav: false,
    items: 1,
    dots: true,
    autoplay: true
  };

  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }
  products = [];
  product: Product;
  quantity = 1;
  id: number;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getProducts(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }

  getProducts(id?) {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      if (id) {
        this.product = products.filter(product => product.id === id)[0];
      }
      this.products = products;
    })
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  shareProduct() {
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

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

}
