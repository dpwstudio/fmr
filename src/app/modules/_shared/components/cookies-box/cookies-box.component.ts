import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies-box',
  templateUrl: './cookies-box.component.html',
  styleUrls: ['./cookies-box.component.scss']
})
export class CookiesBoxComponent implements OnInit {
  @Input() state = true;
  constructor() { }

  ngOnInit(): void {
    this.state = localStorage.getItem('cookies') === 'accepted' ? false : true;
  }

  acceptCookies() {
    localStorage.setItem('cookies', 'accepted');
    this.state = false;
  }

}
