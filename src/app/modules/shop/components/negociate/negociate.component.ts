import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FiltersProducts } from 'src/app/modules/_shared/models/filtersProducts.model';
import { Product } from 'src/app/modules/_shared/models/product.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';

@Component({
  selector: 'app-negociate',
  templateUrl: './negociate.component.html',
  styleUrls: ['./negociate.component.scss']
})
export class NegociateComponent implements OnInit {
  id: number;
  subscription: Subscription;
  product: Product;
  histories: any[];
  filtersProducts: FiltersProducts;
  offerForm!: FormGroup;
  currentUser: User;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filtersProducts = {
        id: this.id
      }
      this.getProducts(this.filtersProducts);
      // In a real app: dispatch action to load the details here.
    });

    this.offerForm = this.formBuilder.group({
      amount: ['', Validators.required],
      productId: [''],
      buyerId: [''],
      sellerId: [''],
    });

   
  }

  getProducts(filtersProducts) {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      this.product = products.filter(product => product.id === filtersProducts.id)[0];
      this.offerForm.patchValue({
        sellerId: this.product.userId,
        productId: this.id,
        buyerId: this.currentUser.id
      });
    });
  }

  getNegociateHistory(filtersProducts) {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(histories => {
      this.histories = histories;
      console.log('this.histories', this.histories)
    })
  }

  sendOffer() {
    console.log('this.offerForm.value', this.offerForm.value)
    this.productService.sendOffer(this.offerForm.value).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      console.log('result', result);
    })
  }
}
