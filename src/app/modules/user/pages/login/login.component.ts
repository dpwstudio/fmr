import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;
  loginForm!: FormGroup;
  returnUrl: string = '';
  currentUser!: User;
  subscription: Subscription;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.subscription = this.authService.getUsers()
      .pipe(
        catchError(error => {
          this.notifier.notify('error', error.message);
          return throwError(error);
        }))
      .subscribe((result: User[]) => {
        const user = result.filter(user => user.email === this.f.email.value && user.password === this.f.password.value)[0];
        if (user) {
          this.authService.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate([this.returnUrl]);
          this.currentUser = this.authService.currentUserValue;
          this.notifier.notify('success', `Vous êtes maintenant connecté.`);
        } else {
          this.notifier.notify('error', 'Email ou mot de passe incorrect');
        }
      });
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

}
