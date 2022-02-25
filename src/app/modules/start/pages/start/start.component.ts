import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  loading = false;
  carouselFullOptions: OwlOptions = {
    loop: true,
    margin: 8,
    nav: false,
    items: 1,
    dots: true,
  }

  constructor(private router: Router, private authService: AuthService) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  isLoading() {

  }

  gotoHome() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['home']);
      this.loading = false;
    }, 2500);
  }
}
