import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FiltersProducts } from '../../models/filtersProducts.model';
import { Product } from '../../models/product.model';
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

  getBrands(): Observable<any[]> {
    return this.http.get(`assets/mock-data/brands.json`) as Observable<any[]>;
  }
 
  getCategories(): Observable<any[]> {
    return this.http.get(`assets/mock-data/categories.json`) as Observable<any[]>;
  }
  
  getSubCategories(): Observable<any[]> {
    return this.http.get(`assets/mock-data/subcategories.json`) as Observable<any[]>;
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

  getProducts(filters?: FiltersProducts): Observable<Product[]> {
    console.log('filters', filters)
    return this.http.post(`${environment.fmrApi}/products/filters`, filters).pipe(
      catchError(error => {
        return throwError(error);
      }),
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
