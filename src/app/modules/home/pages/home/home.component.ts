import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/modules/shared/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = [];
  products = [];
  carouselFullOptions: OwlOptions = {
    loop: true,
    margin: 8,
    nav: false,
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
  quantity = 1;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.categories = [
      {
        name: 'Sacs',
        type: 'Mode',
        img: 'assets/img/categorie/sac.png',
        url: 'shop'
      },
      {
        name: 'Vêtements',
        type: 'Mode',
        img: 'assets/img/categorie/clothes.png',
        url: 'shop'
      },
      {
        name: 'Montres',
        type: 'Mode',
        img: 'assets/img/categorie/watches.png',
        url: 'shop'
      },
      {
        name: 'Chaussures',
        type: 'Mode',
        img: 'assets/img/categorie/sneakers.png',
        url: 'shop'
      },
      {
        name: 'Autres',
        type: 'Mode',
        img: 'assets/img/categorie/chapeau.png',
        url: 'shop'
      },
      {
        name: 'Tableaux',
        type: 'Art',
        img: 'assets/img/categorie/art/artvisuel.png',
        url: 'shop'
      },
      {
        name: 'Sculptures',
        type: 'Art',
        img: 'assets/img/categorie/art/artdeco.png',
        url: 'shop'
      },
      {
        name: 'Objets',
        type: 'Art',
        img: 'assets/img/categorie/art/objets.png',
        url: 'shop'
      },
      {
        name: 'Luminaires',
        type: 'Art',
        img: 'assets/img/categorie/art/luminaire.png',
        url: 'shop'
      },
    ];

    this.products = [
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

  gotoCategory(category) {
    return this.router.navigate([category.url]);
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

}
