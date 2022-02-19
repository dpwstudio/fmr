import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  darkMode: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) { }

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
}