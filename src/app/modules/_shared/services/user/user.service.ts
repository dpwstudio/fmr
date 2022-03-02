import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.currentUser = this.authService.currentUserValue;
    console.log('xxxxx', this.currentUser);
  }

  createUser(user: User) {
    return this.http.post(`${environment.fmrApi}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get(`assets/mock-data/users.json`) as Observable<User[]>;
  }

  getUser(id): Observable<User[]> {
    return this.http.get(`${environment.fmrApi}/users/${id}`) as Observable<User[]>;
  }

  editUser(user) {
    return this.http.put(`${environment.fmrApi}/users/${this.currentUser.id}`, user);
  }

  editAddress(address, deliveryAddress = false) {
    if (deliveryAddress) {
      address.deliveryAddress = true;
    }
    return this.http.put(`${environment.fmrApi}/users/${this.currentUser.id}`, address);
  }

  deleteUser(id) {
    return this.http.delete(`${environment.fmrApi}/users/${id}`);
  }

}
