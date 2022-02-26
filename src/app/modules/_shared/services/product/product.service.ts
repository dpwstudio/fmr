import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FiltersProducts } from '../../models/filtersProducts.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  currentUser: User;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.fmrApi}/products`, product);
  }

  getCategories(): Observable<any[]> {
    return this.http.get(`assets/mock-data/categories.json`) as Observable<any[]>;
  }

  getProducts(filters?: FiltersProducts): Observable<Product[]> {
    return this.http.get(`assets/mock-data/products.json`).pipe(
      map((products: Product[]) => filters ? products.filter(product => product.category === filters.category
        && product.catalogType === filters.catalogType) : products)
    ) as Observable<Product[]>;
  }

  editProduct(product) {
    return this.http.put(`${environment.fmrApi}/products/${product.id}`, product);
  }

  deleteProduct(id) {
    return this.http.delete(`${environment.fmrApi}/products/${id}`);
  }

}