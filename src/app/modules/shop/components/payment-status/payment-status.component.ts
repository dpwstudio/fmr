import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {

  }

}
