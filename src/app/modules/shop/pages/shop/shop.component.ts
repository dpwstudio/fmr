import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/modules/shared/models/product.model';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnChanges {
  products: Product[] = [];
  categories = [];
  typeParams: string;
  category: string;
  quantity = 1;
  search: string;
  subscription: Subscription;
  showSearch = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.typeParams = params['type'];
      this.category = params['category'];
      console.log(`${this.typeParams}`, `${this.category}`);
    });
    this.getProducts();
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.products = changes.products.currentValue;
    }
  }

  getCategories() {
    this.productService.getCategories().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(categories => {
      this.categories = categories;
      console.log('categories', this.categories)
    });
  }

  getProducts() {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.products = products.filter(product => product.category === this.category);
    });
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  gotoProduct(product) {
    return this.router.navigateByUrl(product.url, { state: product });
  }

  isTypeParams(type) {
    return type === this.typeParams;
  }

  searchProduct() {
    if (this.search) {
      this.products = this.products.filter(
        product => product.brand.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          || product.model.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    } else {
      this.getProducts();
    }
  }

}
