import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.post(`${environment.fmrApi}/images`, image).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(res => {
      console.log('Image uploaded with success.');
    });
  }

  sendMultiplePhotosToServer(files) {
    console.log('files', files);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i]);
    }
    formData.append('agentId', '007');
    return this.http.post(`${environment.fmrApi}/multiple-images`, formData).pipe(
      catchError(error => {
        console.log('error', error);
        return throwError(error);
      })
    ).subscribe(res => {
      console.log('Images uploaded with success.');
    });
  }

}
