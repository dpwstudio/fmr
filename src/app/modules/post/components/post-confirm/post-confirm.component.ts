import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.scss'],
})
export class PostConfirmComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

}
