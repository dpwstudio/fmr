import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  } 

  /**
   * Connection au compte
   * @param email 
   * @param password 
   */
  login(email: string, password: string) {
    return this.http.post<any>(`${environment.fmrApi}/auth/login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log('user', user[0])
        const currentUser = user[0];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return currentUser;
      }));
  }

  getUsers() {
    return this.http.get(`assets/mock-data/users.json`) as Observable<User[]>;
  }

  /**
   * Création de compte
   * @param user 
   */
  register(user: User) {
    return this.http.post(`${environment.fmrApi}/auth/register`, user);
  }

  /**
   * Demande de réinitialisation du mot de passe
   * @param email 
   */
  lostPassword(email: string) {
    return this.http.post(`${environment.fmrApi}/auth/lostPassword`, email);
  }

  /**
   * Réintialisation du mot de passe
   * @param password 
   */
  resetPassword(body: any) {
    return this.http.put(`${environment.fmrApi}/auth/resetPassword`, body);
  }
  /**
   * Déconnecté le compte actif en supprimant le currentUser du localStorage (null)
   */
  logout() {
    localStorage.removeItem('currentUser');
  }

  /**
   * L'utilisateur a le rôle ADMIN
   */
  // isAdmin() {
  //   return this.auth.role === 'admin';
  // }
}
