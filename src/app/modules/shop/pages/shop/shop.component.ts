import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products = [];
  typeParams: string;
  quantity = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.typeParams = params['type'];
      console.log(`${this.typeParams}`);
    });
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.products = products;
    })
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

}
