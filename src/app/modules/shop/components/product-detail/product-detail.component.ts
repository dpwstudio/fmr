import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  carouselFullOptions: OwlOptions = {
    loop: true,
    margin: 8,
    nav: false,
    items: 1,
    dots: true,
    autoplay: true
  };

  carouselMultipleOptions: OwlOptions = {
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
  }
  products = [];
  product = {
    name: '',
    description: '',
    category: '',
    SubCategory: '',
    img: '',
    amount: 0,
    fallingAmount: 0,
    url: '',
    like: 0,
    sellerName: '',
    sellerImg: '',
    sellerCountry: ''
  };
  quantity = 1;

  constructor(private router: Router, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.product = history.state;
    console.log('this.product', this.product);
    this.products = [
      {
        name: 'Dior',
        description: 'Sac à main en cuir d\'agneau Cannage rose vif',
        category: 'Mode',
        SubCategory: 'Sacs',
        img: 'assets/img/product/img1.jpeg',
        amount: 3300,
        fallingAmount: 3300,
        url: 'product-detail',
        like: 358,
        sellerName: 'Ava',
        sellerImg: 'assets/img/sample/avatar/avatar4.jpg',
        sellerCountry: 'fr'
      },
      {
        name: 'Louis Vuitton',
        description: 'Sac à bandoulière',
        category: 'Mode',
        SubCategory: 'Sacs',
        img: 'assets/img/annonce/sacs/saclv.jpeg',
        amount: 1995,
        fallingAmount: 1524,
        url: 'product-detail',
        like: 188,
        sellerName: 'Ava',
        sellerImg: 'assets/img/sample/avatar/avatar4.jpg',
        sellerCountry: 'fr'
      },
      {
        name: 'Dior',
        description: 'Sac en toile',
        category: 'Mode',
        subCategory: 'Sacs',
        img: 'assets/img/annonce/sacs/sacdior.jpeg',
        amount: 2150,
        fallingAmount: 1850,
        url: 'product-detail',
        like: 245,
        sellerName: 'Géraldine',
        sellerImg: 'assets/img/sample/avatar/avatar7.jpg',
        sellerCountry: 'it'
      },
      {
        name: 'Balenciaga',
        description: 'Baskets montantes en cuir',
        category: 'Mode',
        subCategory: 'Chaussures',
        img: 'assets/img/annonce/sacs/sneakers.jpeg',
        amount: 650,
        fallingAmount: 480,
        url: 'product-detail',
        like: 68,
        sellerName: 'Laurent',
        sellerImg: 'assets/img/sample/avatar/avatar3.jpg',
        sellerCountry: 'es'
      },
      {
        name: 'Chanel',
        description: 'Bonnet en cachemire',
        category: 'Mode',
        subCategory: 'Autres',
        img: 'assets/img/annonce/sacs/bonnet.jpeg',
        amount: 388,
        fallingAmount: 240,
        url: 'product-detail',
        like: 32,
        sellerName: 'John',
        sellerImg: 'assets/img/sample/avatar/avatar1.jpg',
        sellerCountry: 'be'
      },
    ];
  }

  shareProduct() {
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

  gotoCategory(category) {
    return this.router.navigate([category.url]);
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

}
