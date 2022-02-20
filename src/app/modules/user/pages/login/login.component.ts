import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { User } from 'src/app/modules/shared/models/user.model';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  returnUrl: string = '';
  currentUser!: User;
  showAlertSuccess = false;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.subscription = this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(
        first(),
        catchError(error => {
          if (error.status === 404) {
            alert('Email ou mot de passe incorrect, veuillez réessayer.');
          } else {
            alert(error.message);
          }
          return throwError(error);
        }))
      .subscribe(result => {
        this.router.navigate([this.returnUrl]);
        this.currentUser = this.authService.currentUserValue;
        this.showAlertSuccess = true;
        // alert(`Vous êtes maintenant connecté à Mummy's Food`);
      });
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

}
