import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmailToRegister(body) {
    return this.http.post(`${environment.fmrApi}/emails/register`, body);
  }

  sendEmailToNewOrder(body) {
    return this.http.post(`${environment.fmrApi}/emails/order`, body);
  }

  sendEmailToAdmin(body) {
    return this.http.post(`${environment.fmrApi}/emails/contact`, body);
  }

  sendEmailForLostPassword(body) {
    return this.http.post(`${environment.fmrApi}/emails/lostPassword`, body);
  }
}
