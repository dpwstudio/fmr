import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  src = 'assets/img/sample/photo/wide3.jpg';
  width = 100;
  height = 100;
  constructor() { }

  ngOnInit(): void {
  }

}
