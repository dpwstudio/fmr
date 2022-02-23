import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  getProducts(): Observable<Product[]> {
    return this.http.get(`assets/mock-data/products.json`) as Observable<Product[]>;
  }

  editProduct(product) {
    return this.http.put(`${environment.fmrApi}/products/${product.id}`, product);
  }

  deleteProduct(id) {
    return this.http.delete(`${environment.fmrApi}/products/${id}`);
  }

}
