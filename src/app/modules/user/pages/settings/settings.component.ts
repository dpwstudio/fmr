import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  darkMode: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  showDarkTheme() {
    console.log(this.darkMode)
    if (this.darkMode) {
      this.renderer.addClass(this.document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-mode');
    }
  }

  logout() {
    this.authService.logout();
    // this.notifier.notify('success', 'Vous êtes déconnecté')
    this.router.navigate(['/login']);
  }
}
