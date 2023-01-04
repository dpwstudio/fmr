import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { EmailService } from 'src/app/modules/_shared/services/email/email.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private readonly notifier: NotifierService;
  showStep1 = true;
  showStep2 = false;
  showStep3 = false;
  showStep4 = false;
  showFinalStep = false;
  registerForm: FormGroup;
  subscription: Subscription;
  inputType = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private emailService: EmailService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      firstname: ["", Validators.required],
      newsletters: [""],
      cguAccepted: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.notifier.notify('error', 'Les mots de passe sont différents')
      return;
    }

    console.log('value', this.registerForm.value);
    this.subscription = this.authService.register(this.registerForm.value).pipe(
      first(),
      catchError(error => {
        if (error.status === 409) {
          this.notifier.notify("error", 'Cet email existe déjà, veuillez en saisir un autre.');
        } else {
          this.notifier.notify("error", error.message);
        }
        return throwError(error);
      })
    ).subscribe(data => {
        this.notifier.notify("success", 'Votre inscription a bien été prise en compte.'); ``
        // this.emailService.sendEmailToRegister(this.registerForm.value).subscribe(data => console.log('send email', data));
        this.router.navigate(['/login']);
      }
    );
  }

  isLoading() {
    return this.subscription && !this.subscription.closed;
  }

  initStep(step: string) {
    if (step === 'showStep2') {
      this.showStep1 = false;
      this.showStep2 = true;
    }
  }

  showPassword() {
    return this.inputType === 'password' ? this.inputType = 'text' : this.inputType = 'password';
  }
}
