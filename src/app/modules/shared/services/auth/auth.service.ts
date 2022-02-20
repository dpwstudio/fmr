import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Récupère l'utilisateur connecté
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
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

        console.log('user', user)
        localStorage.setItem('currentUser', JSON.stringify(user[0]));
        this.currentUserSubject.next(user);
        return user;
      }));
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
    this.currentUserSubject.next(null);
  }

  /**
   * L'utilisateur a le rôle ADMIN
   */
  isAdmin() {
    return this.currentUserValue[0].role === 'admin';
  }
}
