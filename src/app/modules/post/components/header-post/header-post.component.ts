import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss']
})
export class HeaderPostComponent implements OnInit {
  @Input() title: string;
  @Input() linkLeft: string;
  @Input() linkRight: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoLeft() {
    
  }

  gotoRight() {
    this.router.navigate(['home']);
  }

}
