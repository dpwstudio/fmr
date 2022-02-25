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
  typeProduct: string;
  category: string;
  quantity = 1;
  search: string;
  subscription: Subscription;
  showSearch = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.typeProduct = params['productType'];
      this.category = params['category'];
      console.log(`${this.typeProduct}`, `${this.category}`);
      this.getProducts(this.typeProduct, this.category);
    });
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      console.log('changes', changes);
      if (changes.products.currentValue) {
        this.products = changes.products.currentValue;
      }
    }
  }

  getCategories() {
    this.productService.getCategories().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(categories => {
      this.categories = categories;
    });
  }

  getProducts(typeProductParams?, categoryParams?) {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.products = products.filter(product => product.productType === typeProductParams && product.category === categoryParams);
      console.log('typeProductParams', typeProductParams);
      console.log('categoryParams', categoryParams);
    });
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isTypeParams(type) {
    return type === this.typeProduct;
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

  isCategoryMode(category) {
    return category.type === 'mode';
  }

  isCategoryArt(category) {
    return category.type === 'art';
  }

  emptySearch() {
    return this.search = '';
  }

}
