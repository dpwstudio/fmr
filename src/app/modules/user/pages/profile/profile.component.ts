import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  darkMode: boolean = false;
  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }

  carouselMultipleOptions2: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }

  carouselMultipleOptions3: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }
  quantity = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  shareProfile() {
    const navigator = window.navigator as any;

    if (navigator.share) {
      navigator
        .share({
          title: 'FMR Store',
          text: 'Pop-up store',
          url: 'https://lumiaouvertures.fr/fmr'
        })
        .then(() => console.log('Successful share'))
        .catch((error: any) => console.log('Error sharing', error));
    } else {
      alert('share not supported');
    }
  }

}
