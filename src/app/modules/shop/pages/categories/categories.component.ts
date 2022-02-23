import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = [];
  loading = false;
  subscription: Subscription;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.subscription = this.productService.getCategories().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(categories => {
      this.categories = categories;
    })
  }

  isCategoryMode(category) {
    return category.type === 'Mode';
  }

  isCategoryArt(category) {
    return category.type === 'Art';
  }

  gotoCategory(category) {
    return this.router.navigate([category.url]);
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }
}
