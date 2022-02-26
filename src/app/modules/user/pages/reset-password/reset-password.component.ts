import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { EmailService } from 'src/app/modules/_shared/services/email/email.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  returnUrl: string;
  currentUser: User;
  subscription: Subscription;
  showMessage = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  sendRequest() {
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.showMessage = true;

    this.subscription = this.authService.lostPassword(this.resetPasswordForm.value).pipe(
      catchError(error => {
        // this.notifier.notify('error', error.error.message);
        return throwError(error);
      })
    ).subscribe(data => {
      // this.emailService.sendEmailForLostPassword(this.resetPasswordForm.value).subscribe(() => {
      //   this.router.navigate(['home']);
      //   // this.notifier.notify("success", `La demande a bien été pris en compte, vérifiez vos emails pour réinitialiser votre mot de passe.`);
      // });
    });
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

}
