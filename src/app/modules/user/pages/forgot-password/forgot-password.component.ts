import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['home']);
    })
  }
}
