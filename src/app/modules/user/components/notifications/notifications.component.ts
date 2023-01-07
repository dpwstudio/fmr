import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationUser } from 'src/app/modules/_shared/models/notification.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { NotificationsService } from 'src/app/modules/_shared/services/notifications/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  currentUser: User;
  notifications: NotificationUser[] = [];
  id: number;

  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getNotifications(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }

  getNotifications(id) {
    this.notificationService.getNotification(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(notifications => {
      console.log('xxxx', notifications)
      const notificationUnRead = notifications.filter(notification => notification.status === 'unread');
      this.notificationService.counter$.next(notificationUnRead.length);
      this.notifications = notifications;
    })
  }

  getTitleNotification(type) {
    if (type === 'comment') {
      return 'Nouveau commentaire';
    } else if (type === 'payment') {
      return 'C\'est jour de paie !';
    } else if (type === 'password') {
      return 'Mot de passe changé';
    } else if (type === 'order') {
      return 'Votre commande est confirmé !';
    } else if (type === 'follower') {
      return '1 nouvel abonné !';
    } else if (type === 'sold') {
      return 'Votre article est vendu !';
    } else if (type === 'wishlist') {
      return 'Un membre est interessé par votre article';
    } else if (type === 'post') {
      return 'Merci pour votre annonce !';
    } else {
      return '';
    }
  }

  getIconNotification(type) {
    if (type === 'comment') {
      return 'chatbubble';
    } else if (type === 'payment') {
      return 'cash';
    } else if (type === 'password') {
      return 'key';
    } else if (type === 'order') {
      return 'bag-check';
    } else if (type === 'follower') {
      return 'person-add';
    } else if (type === 'sold') {
      return 'thumbs-up';
    } else if (type === 'wishlist') {
      return 'heart';
    } else if (type === 'post') {
      return 'add';
    } else {
      return '';
    }
  }

  readNotification(id) {
    console.log('id', id)
    this.notificationService.readNotification(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(res => {
      this.getNotifications(this.currentUser.id);
      console.log('res', res);
    });
  }


  getDate(date) {
    return moment(date, "YYYYMMDD").locale('fr').fromNow();
  }

}
