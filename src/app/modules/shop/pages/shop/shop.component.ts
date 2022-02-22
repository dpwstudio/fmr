import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products = [];
  typeParams: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.typeParams = params['type'];
      console.log(`${this.typeParams}`);
    });
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
    ]
  }

  gotoProduct(product) {
    return  this.router.navigateByUrl(product.url, { state: product });;
  }

  isTypeParams(type) {
    return type === this.typeParams;
  }

}
