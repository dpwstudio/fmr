import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { of, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from 'src/app/modules/_shared/models/comment.model';
import { FiltersProducts } from 'src/app/modules/_shared/models/filtersProducts.model';
import { NotificationUser } from 'src/app/modules/_shared/models/notification.model';
import { Product } from 'src/app/modules/_shared/models/product.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { NotificationsService } from 'src/app/modules/_shared/services/notifications/notifications.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  private readonly notifier: NotifierService;
  carouselFullOptions: OwlOptions = {
    loop: true,
    margin: 8,
    nav: false,
    items: 1,
    dots: true,
    autoplay: true
  };

  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  };

  carouselSingleOptions: OwlOptions = {
    stagePadding: 30,
    loop: true,
    margin: 16,
    nav: false,
    items: 1,
    dots: false,
    autoplay: true,
  }

  carouselSmallOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 8,
    nav: false,
    items: 4,
    dots: false,
  }

  products: Product[] = [];
  productsSuggested: Product[] = [];
  comments: Comment[] = [];
  currentProduct: Product;
  quantity = 1;
  id: number;
  subscription: Subscription;
  filtersProducts: FiltersProducts;
  currentImg: string;
  commentForm: FormGroup;
  editPriceForm: FormGroup;
  currentUser: User;
  wishlists: Product[] = [];
  loves: any[] = [];
  price: string;
  amountWin: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationsService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filtersProducts = {
        id: this.id
      }
      this.getProducts(this.filtersProducts);
      this.getComments(this.filtersProducts.id);
      this.getWishlists(this.id);

      this.commentForm = this.formBuilder.group({
        comment: ['', Validators.required],
        productId: [this.id, Validators.required],
        userId: [this.currentUser?.id, Validators.required],
      });
    });
    this.editPriceForm = this.formBuilder.group({
      price: ['', Validators.required],
      fallingPrice: [''],
      oldPrice: [''],
      amountWin: ['', Validators.required],
    });
    this.getLoves();
  }

  trackById(index, item) {
    return item.id;
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  getProducts(filtersProducts) {
    this.subscription = this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe((products: any[]) => {
      this.products = products;
      this.currentProduct = this.products.filter(product => product.id === filtersProducts.id)[0];
      this.price = String(this.currentProduct.price);
      this.amountWin = String(this.currentProduct.amountWin);
      this.productsSuggested = products.filter(product => product.category === this.currentProduct.category && product.id !== this.currentProduct.id);
    })
  }

  getComments(id) {
    this.subscription = this.productService.getComment(id).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of([]);
        }
        return throwError(error);
      })
    ).subscribe((comments: Comment[]) => {
      this.comments = comments;
    })
  }

  shareProduct() {
    const navigator = window.navigator as any;
    if (navigator.share) {
      navigator
        .share({
          title: 'FMR Lifestyle',
          text: 'Pop-up store online',
          url: 'https://kdrive.fr/fmr'
        })
        .then(() => console.log('Successful share'))
        .catch((error: any) => console.log('Error sharing', error));
    } else {
      this.notifier.notify('error', 'Le partage est indisponible sur votre navigateur');
    }
  }

  addComment() {
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      this.notifier.notify('error', 'Le formulaire est invalide.');
      return;
    }

    this.subscription = this.productService.addComment(this.commentForm.value).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(result => {
      this.notifier.notify('success', 'Votre commentaire a été ajouté avec succès.');
      this.commentForm.reset();
      this.getComments(this.id);
      this.createNotification(
        'comment',
        this.currentProduct,
        this.currentUser
      );
    })
  }

  createNotification(type, to, from) {
    this.notificationService.addNotification(type, to, from).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(res => console.log('res', res));
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  getCurrentImg(img) {
    if (img?.endsWith('_')) {
      return this.currentImg = 'assets/img/default-img.png';
    } else {
      return this.currentImg = img;
    }
  }

  addToWishlist(product, userId) {
    if (userId === product.userId) {
      this.notifier.notify('error', 'Vous ne pouvez pas ajouter vos propres articles dans votre Wishlist.');
      return;
    }
    const data = {
      productId: product.id,
      userId: userId
    }

    this.subscription = this.productService.addToWishlist(data).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.notifier.notify('error', 'L\'article a déjà été ajouté dans votre Wishlist')
        }
        return throwError(error);
      })
    ).subscribe(result => {
      this.notifier.notify('success', 'L\'article a bien été ajouté dans votre Wishlist');
      this.getWishlists(this.id);
      this.createNotification(
        'wishlist',
        product,
        this.currentUser
      );
    })
  }

  getWishlists(id) {
    this.productService.getWishlists(this.currentUser?.id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(wishlists => {
      this.wishlists = wishlists.filter(wishlist => wishlist.productId === id);
    })
  }

  isInWishlist(): boolean {
    return this.wishlists.length > 0;
  }

  getLoves() {
    this.productService.getLoves(this.id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(loves => {
      this.loves = loves;
    })
  }

  loveProduct(product, userId) {
    const data = {
      productId: product.id,
      userId: userId
    }

    this.subscription = this.productService.loveProduct(data).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.notifier.notify('error', 'Vous aimez déjà ce produit')
        }
        return throwError(error);
      })
    ).subscribe(result => {
      this.notifier.notify('info', 'Vous aimez cette article ? Acheter le avant qu\'il ne soit trop tard !');
      this.getLoves();
    })
  }

  hasAlreadyLove(userId): boolean {
    return this.loves.filter(love => love.userId === userId).length > 0;
  }

  isMyProduct(userId?): boolean {
    return userId === this.currentUser?.id;
  }

  onPriceChange(event) {
    const amount = event * 0.89;
    this.amountWin = amount.toFixed(2);
    this.editPriceForm.patchValue({
      price: event,
      fallingPrice: event,
      oldPrice: this.currentProduct.price,
      amountWin: parseFloat(this.amountWin),
    });
  }

  isFallingPrice(product: Product) {
    return product?.fallingPrice > 0;
  }

  editPrice() {
    const product = {
      amount: this.editPriceForm.value,
      id: this.currentProduct.id
    }
    this.productService.editProduct(product).pipe(
      catchError(error => {
        this.notifier.notify('error', error.message);
        return throwError(error);
      })
    ).subscribe(res => {
      this.notifier.notify('success', 'La baisse de prix a bien été prise en compte.');
      this.getProducts(this.filtersProducts);
    });
  }

  isSelled(status) {
    return status === 'selled';
  }

  hasNoPhoto(photo) {
    return photo?.endsWith('_');
  }
}
