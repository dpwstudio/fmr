import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carouselFullOptions: OwlOptions = {
    loop:true,
    margin:8,
    nav:false,
    items: 1,
    dots: false,
    autoplay: true
  };
  carouselSingleOptions: OwlOptions = {
    stagePadding: 30,
    loop: true,
    margin: 16,
    nav: false,
    items: 1,
    dots: true,
    autoplay: true,
  }

  carouselSmallOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 8,
    nav: false,
    items: 4,
    dots: false,
  }

  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
