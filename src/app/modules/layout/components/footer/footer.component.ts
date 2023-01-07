import { Component, OnInit } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { NotificationsService } from 'src/app/modules/_shared/services/notifications/notifications.service';
import * as moment from 'moment';
import { User } from 'src/app/modules/_shared/models/user.model';
import { NotificationUser } from 'src/app/modules/_shared/models/notification.model';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentUser: User;
  notifications: NotificationUser[];

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private notificationService: NotificationsService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.isUserConnected()) {
      this.getTotalNotifications();
      this.getNotifications(this.currentUser.id);
    }
  }

  isUserConnected() {
    return this.authService.getCurrentUser();
  }

  getTotalCurrentCart() {
    return this.cartService.cartProductList.length;
  }

  getTotalNotifications() {
    return this.notificationService.counter$.getValue();
  }

  getNotifications(id) {
    this.notificationService.getNotification(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(notifications => {
      const notificationUnRead = notifications.filter(notification => notification.status === 'unread');
      this.notificationService.counter$.next(notificationUnRead.length);
      this.notifications = notifications;
    })
  }

}
