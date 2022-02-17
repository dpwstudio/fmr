import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  showStep1 = true;
  showStep2 = false;
  showStep3 = false;
  showStep4 = false;
  showFinalStep = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['home']);
    })
  }

  initStep(step: string) {
    if (step === 'showStep2') {
      this.showStep1 = false;
      this.showStep2 = true;
    }
  }
}
