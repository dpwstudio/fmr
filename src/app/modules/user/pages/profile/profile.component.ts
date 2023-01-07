import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin, Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationUser } from 'src/app/modules/_shared/models/notification.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { FollowerService } from 'src/app/modules/_shared/services/follower/follower.service';
import { NotificationsService } from 'src/app/modules/_shared/services/notifications/notifications.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private readonly notifier: NotifierService;
  productsArt = [];
  productsMens = [];
  productsWomens = [];
  productsKids = [];
  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }

  carouselMultipleOptions2: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }

  carouselMultipleOptions3: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }
  quantity = 1;
  user: User;
  currentUser: User;
  users: User[];
  id: number;
  catalogType: string;
  nbFollowers: number;
  nbSubscribers: number;

  img = {
    dressingSrc: '',
    gallerySrc: '',
  }
  subscription: Subscription;
  followers: User[] = [];
  subscribers: User[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private followerService: FollowerService,
    private notificationService: NotificationsService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.catalogType = params['catalogType']; // (+) converts string 'id' to a number
      this.getUser(this.id);
      this.getCountFollowers(this.id);
      this.getCountSubscribers(this.id);
      this.getFollowers(this.id);
      this.getSubscribers(this.id);
      this.getProducts();
      // In a real app: dispatch action to load the details here.
    });
  }

  isMyProfile() {
    return this.authService.getCurrentUser().id === this.id;
  }

  /**
   * Récupère l'image du profil
   * @param user
   * @returns 
   */
  getUserImgProfile(user) {
    return this.userService.getUserImgProfile(user).avatar;
  }

  getCountryUserProfile(address) {
    return this.userService.getCountryUserProfile(address);
  }

  getUser(id) {
    this.userService.getUser(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(users => {
      if (id) {
        this.user = users.filter(user => user.id === id)[0];
      }
    });
  }

  getProducts() {
    this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      if (this.user) {
        this.productsArt = products.filter(product => product.userId === this.user.id && product.catalogType === 'art');
        this.productsMens = products.filter(product => product.userId === this.user.id && product.kind === 'mens');
        this.productsWomens = products.filter(product => product.userId === this.user.id && product.kind === 'womens');
        this.productsKids = products.filter(product => product.userId === this.user.id && product.kind === 'kids');
      }
    })
  }

  trackById(index, item) {
    return item.id;
  }

  followProfile(user) {
    const follower = {
      profileId: user.id,
      followerId: this.currentUser.id
    };
    console.log('this.currentUser', this.currentUser);
    this.followerService.createFollower(follower).pipe(
      catchError(error => {
        if (error.status === 409) {
          this.notifier.notify('error', 'Vous êtes déjà abonné.');
        }
        return throwError(error);
      })
    ).subscribe(res => {
      this.getCountFollowers(this.id);
      this.getCountSubscribers(this.id);
      this.getFollowers(this.id);
      this.getSubscribers(this.id);
      this.notifier.notify('success', `Vous êtes maintenant abonné au profil de ${user.firstname}`);
      this.createNotification(
        'follower',
        user,
        this.currentUser
      );
    });
  }

  getCountFollowers(id) {
    this.followerService.getFollowerById(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(followers => {
      this.nbFollowers = followers.length;
    })
  }

  getCountSubscribers(id) {
    this.followerService.getSubscriptions(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(subscribers => {
      this.nbSubscribers = subscribers.length;
    })
  }

  getFollowers(id) {
    forkJoin([this.followerService.getFollowers(), this.userService.getUsers()]).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map(results => {
        let followers = [];
        results[0].forEach(follower => {
          results[1].forEach(user => {
            if (follower.profileId === id && follower.followerId === user.id) {
              followers.push(user);
            }
          })
        });
        return followers;
      })
    ).subscribe(followers => {
      this.followers = followers;
    })
  }

  hasFollowers(followers) {
    return followers.length > 0;
  }

  getSubscribers(id) {
    forkJoin([this.followerService.getFollowers(), this.userService.getUsers()]).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map(results => {
        let subscribers = [];
        results[0].forEach(subscriber => {
          results[1].forEach(user => {
            if (subscriber.profileId === user.id && subscriber.followerId === id) {
              subscribers.push(user);
            }
          })
        });
        return subscribers;
      })
    ).subscribe(subscribers => {
      this.subscribers = subscribers;
    })
  }

  hasSubscribers(subscribers) {
    return subscribers.length > 0;
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isCatalogArt() {
    return this.catalogType === 'art';
  }

  isKindMens(product) {
    return product.kind === 'mens';
  }

  isKindWomens(product) {
    return product.kind === 'womens';
  }

  isKindKids(product) {
    return product.kind === 'kids';
  }

  isArtProduct(product) {
    return product.category === 'art';
  }

  createNotification(type, to, from) {
    this.notificationService.addNotification(type, to, from).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(res => console.log('res', res));
  }
}
