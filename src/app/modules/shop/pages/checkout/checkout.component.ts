import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  recto = true;
  verso = false;

  constructor() { }

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
}
