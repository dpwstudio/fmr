import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  createUser(user: User) {
    return this.http.post(`${environment.fmrApi}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get(`${environment.fmrApi}/users`).pipe(
      catchError(error => {
        return throwError(error);
      })
    ) as Observable<User[]>;
  }

  getUser(id): Observable<User[]> {
    return this.http.get(`${environment.fmrApi}/users/${id}`) as Observable<User[]>;
  }

  editImg(img, imgType, id) {
    console.log('img', img);
    console.log('this.currentUser.id', id);
    img.imgType = imgType;
    return this.http.put(`${environment.fmrApi}/users/${id}`, img);
  }

  editUserInfos(user, userId) {
    console.log('user', user);
    return this.http.put(`${environment.fmrApi}/users/${userId}`, user);
  }

  editAddress(address, addressType, userId) {
    address.addressType = addressType;
    return this.http.put(`${environment.fmrApi}/users/${userId}`, address);
  }

  deleteUser(id) {
    return this.http.delete(`${environment.fmrApi}/users/${id}`);
  }

  getUserImgProfile(user) {
    let imgProfile = {
      avatar: '',
      dressing: '',
      gallery: ''
    };
    if (user && user.img) {
      const img = JSON.parse(user.img)[0];
      if (img.avatar) {
        imgProfile.avatar = img.avatar;
      } else {
        imgProfile.avatar = 'assets/img/default-img.svg';
      }
      if (img.dressing) {
        imgProfile.dressing = img.dressing;
      } else {
        imgProfile.dressing = 'assets/img/dressing/dressing1.png';
      }
      if (img.gallery) {
        imgProfile.gallery = img.gallery;
      } else {
        imgProfile.gallery = 'assets/img/gallery/gallery3.png';
      }
    } else {
      imgProfile.avatar = 'assets/img/default-img.svg';
      imgProfile.dressing = 'assets/img/dressing/dressing1.png';
      imgProfile.gallery = 'assets/img/gallery/gallery3.png';
    }
    return imgProfile;
  }

}
