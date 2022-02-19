import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  recto = true;
  verso = false;
  showLoading = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  turnCard(type: string) {
    if (type === 'recto') {
      this.recto = true;
      this.verso = false;
    } else {
      this.recto = false;
      this.verso = true;
    }
  }

  processPayment() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
      this.router.navigate(['payment-status']);
    }, 2000)
  }
}
