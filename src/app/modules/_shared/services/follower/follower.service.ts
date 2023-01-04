import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  currentUser: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  createFollower(follower) {
    return this.http.post(`${environment.fmrApi}/followers`, follower);
  }

  getFollowers(): Observable<any[]> {
    return this.http.get(`${environment.fmrApi}/followers`).pipe(
      catchError(error => {
        return throwError(error);
      })
    ) as Observable<any[]>;
  }

  getFollowerById(profileId): Observable<any[]> {
    return this.http.get(`${environment.fmrApi}/followers/${profileId}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of([]);
        }
        return throwError(error);
      }),
    ) as Observable<any[]>;
  }

  getSubscriptions(followerId): Observable<any[]> {
    return this.http.get(`${environment.fmrApi}/followers/subscriptions/${followerId}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of([]);
        }
        return throwError(error);
      })
    ) as Observable<any[]>;
  }

}