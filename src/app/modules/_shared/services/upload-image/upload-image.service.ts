import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  sendPhotoToServer(image) {
    console.log('image', image);
    return this.http.post(`${environment.fmrApi}/images`, image).subscribe(
      res => {
        console.log('Image uploaded with success.');
      },
      error => {
        console.error('error', error.message);
      });;
  }

}
