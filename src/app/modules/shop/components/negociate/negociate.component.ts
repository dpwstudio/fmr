import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FiltersProducts } from 'src/app/modules/shared/models/filtersProducts.model';
import { Product } from 'src/app/modules/shared/models/product.model';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';

@Component({
  selector: 'app-negociate',
  templateUrl: './negociate.component.html',
  styleUrls: ['./negociate.component.scss']
})
export class NegociateComponent implements OnInit {
  id: number;
  subscription: Subscription;
  product: Product;
  products: Product[];
  filtersProducts: FiltersProducts;
  
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filtersProducts = {
        id: this.id
      }
      this.getProducts(this.filtersProducts);
      // In a real app: dispatch action to load the details here.
    });
  }

  getProducts(filtersProducts) {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.products = products;
      this.product = this.products.filter(product => product.id === filtersProducts.id)[0];
    })
  }
}
