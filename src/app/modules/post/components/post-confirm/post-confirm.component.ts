import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/modules/_shared/models/product.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.scss'],
})
export class PostConfirmComponent implements OnInit {
  currentUser: User;
  id: number;
  product: Product;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getProduct(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }

  getProduct(id) {
    this.productService.getProduct(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(product => {
      this.product = product[0];
      console.log('this.product', this.product);
    })
  }
}
