import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = [];

  constructor(private router: Router) { }

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
    ]
  }

  isCategoryMode(category) {
    return category.type === 'Mode';
  }

  isCategoryArt(category) {
    return category.type === 'Art';
  }

  gotoCategory(category) {
    return this.router.navigate([category.url]);
  }
}
