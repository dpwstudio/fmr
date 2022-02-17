import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  state = false;

  constructor() { }

  ngOnInit(): void {
    this.startLoader();
  }

  startLoader() {
    this.state = true;
    setTimeout(() => {
      this.state = false;
    }, 2500)
  }

}
