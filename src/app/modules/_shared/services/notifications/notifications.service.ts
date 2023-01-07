import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationUser } from '../../models/notification.model';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  currentUser: User;
  counter$ = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.getNotification(this.currentUser.id);
  }

  addNotification(type, to, from) {
    let message = '';
    let img = '';
    let userIdToNotify;
    console.log('data', JSON.parse(from.img));
    if (type === 'comment') {
      message = `${from.firstname?.toUpperCase()} a ajouté un commentaire à votre article.`;
      img = JSON.parse(to.img)[0].photoFace;
      userIdToNotify = to.userId;
    } else if (type === 'payment') {
      message = `Votre paiement arrivera sur votre compte dans les 48h.`;
      img = '';
      userIdToNotify = to.id;
    } else if (type === 'password') {
      message = `La modification de votre mot de passe a bien été enregistré.`;
      img = '';
      userIdToNotify = to.id;
    } else if (type === 'order') {
      message = `Votre commande est confirmée. Vous pourrez suivre son évolution dans l'espace "Mes commandes"`;
      img = '';
      userIdToNotify = to.id;
    } else if (type === 'follower') {
      message = `${from.firstname?.toUpperCase()} s'est abonné à votre profil.`;
      img = from.img ? JSON.parse(from.img)[0].avatar : 'assets/img/default-img.svg';
      userIdToNotify = to.id;
    } else if (type === 'sold') {
      message = `Félicitation ${from.firstname?.toUpperCase()} ! Votre article est vendu`;
      img = '';
      userIdToNotify = to.id;
    } else if (type === 'wishlist') {
      message = `${from.firstname?.toUpperCase()} a ajouté votre article dans sa wishlist.`;
      img = JSON.parse(to.img)[0].photoFace;
      userIdToNotify = to.userId;
    } else if (type === 'post') {
      console.log('to', to)
      console.log('from', from)
      message = `Le dépôt de votre annonce a bien été pris en compte, nous vous ferons un retour dans les 48h.`;
      img = to.photoFace;
      userIdToNotify = from.id;
    } else {
      message = '';
      img = '';
      userIdToNotify = to.id;
    }

    const notification: NotificationUser = {
      type: type,
      message: message,
      userIdToNotify: userIdToNotify,
      img: img,
      status: 'unread'
    }
    console.log('notification', notification);
    return this.http.post(`${environment.fmrApi}/notifications`, notification);
  }

  getNotification(id) {
    return this.http.get(`${environment.fmrApi}/notifications/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      tap((notifications: NotificationUser[]) => this.counter$.next(notifications.filter(notification => notification.status === 'unread').length))
    ) as Observable<NotificationUser[]>;
  }

  readNotification(id) {
    const notification = {
      status: 'read'
    };
    return this.http.put(`${environment.fmrApi}/notifications/${id}`, notification);
  }
}
