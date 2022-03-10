import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FiltersProducts } from '../../models/filtersProducts.model';
import { Product } from '../../models/product.model';
import { ProductModel } from '../../models/productModel.model';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.fmrApi}/products`, product);
  }

  getCategories(): Observable<any[]> {
    return this.http.get(`assets/mock-data/categories.json`) as Observable<any[]>;
  }

  getProduct(id) {
    return this.http.get(`${environment.fmrApi}/products/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((products: Product[]) => {
        return products.map(product => new Product(product));
      })
    ) as Observable<Product[]>;
  }

  getProductsMock(filters?: FiltersProducts): Observable<ProductModel[]> {
    return this.http.get(`assets/mock-data/products.json`).pipe(
      map((products: ProductModel[]) => filters ? products.filter(product => product.category === filters.category
        && product.catalogType === filters.catalogType) : products)
    ) as Observable<ProductModel[]>;
  }

  getProducts(filters?: FiltersProducts): Observable<Product[]> {
    return this.http.get(`${environment.fmrApi}/products`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      tap((products: Product[]) => filters ? products.filter(product => product.category === filters.category
        && product.catalogType === filters.catalogType) : products),
      map((products: Product[]) => {
          return products.map(product => new Product(product));
        }),
    ) as Observable<Product[]>;
  }

  editProduct(product) {
    return this.http.put(`${environment.fmrApi}/products/${product.id}`, product);
  }

  deleteProduct(id) {
    return this.http.delete(`${environment.fmrApi}/products/${id}`);
  }

}
