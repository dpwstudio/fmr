import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { FiltersProducts } from 'src/app/modules/shared/models/filtersProducts.model';
import { Product } from 'src/app/modules/shared/models/product.model';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnChanges {
  @ViewChild('searchElementRef', { static: true }) searchElementRef: ElementRef<HTMLInputElement>;
  products: Product[] = [];
  categories = [];
  quantity = 1;
  search: string;
  subscription: Subscription;
  showSearch = false;
  filtersProducts: FiltersProducts;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.filtersProducts = {
        category: params['category'],
        productType: params['productType'],
      }
      console.log(`${this.filtersProducts}`);
      this.getProducts(this.filtersProducts);
    });
    this.getCategories();
    this.initSearchInputHandler();
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

  getProducts(filtersProducts, textToSearch?) {
    this.subscription = this.productService.getProducts(filtersProducts).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      if (textToSearch) {
        this.products = products.filter(product => product.brand.toLowerCase().indexOf(textToSearch.toLowerCase()) > -1 || product.model.toLowerCase().indexOf(textToSearch.toLowerCase()) > -1);
      } else {
        this.products = products;
      }
      console.log('this.products', this.products)
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
    return type === this.filtersProducts.productType;
  }

  searchProduct() {
    if (this.search) {
      this.products = this.products.filter(
        product => product.brand.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          || product.model.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    } else {
      this.getProducts(this.filtersProducts);
    }
  }

  initSearchInputHandler() {
    fromEvent(this.searchElementRef.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
    ).subscribe(text => {
      console.log('text', text)
      this.getProducts(this.filtersProducts, text);
      this.search = text;
    })
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
