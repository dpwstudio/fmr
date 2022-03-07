import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Product } from 'src/app/modules/_shared/models/product.model';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  loading = false;
  product: Product = {
    img: {
      photoFace: '',
      photoFaceSrc: '',
      photoDos: '',
      photoDosSrc: '',
      photoProfile: '',
      photoProfileSrc: '',
      photoGriffe: '',
      photoGriffeSrc: '',
      photo5: '',
      photo5Src: '',
      photo6: '',
      photo6Src: '',
    },
    catalogType: 'mode',
    kind: '',
    category: '',
    brand: '',
    model: '',
    matter: '',
    color: '',
    description: '',
    categoryArt: '',
    descriptionArt: '',
    stateChoice: '',
    stateChoiceArt: '',
    dimensions: {
      width: '',
      height: '',
      depth: '',
    },
    amount: {
      price: null,
      fallingPrice: null,
      amountWin: null,
    },
    createdAt: moment().format()
  }
  currentUser: User;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  isPhotosComplete() {
    return this.product.img.photoFace
      && this.product.img.photoDos
      && this.product.img.photoProfile
      && this.product.img.photoGriffe
      || this.product.img.photo5
      || this.product.img.photo6;
  }

  isDescriptionComplete() {
    return this.product.category
      && this.product.brand
      && this.product.model
      && this.product.matter
      && this.product.color
      && this.product.description
      || (this.product.categoryArt
        && this.product.descriptionArt);
  }

  isDimensionsComplete() {
    return this.product.dimensions.width
      && this.product.dimensions.height
      && this.product.dimensions.depth;
  }

  isStateChoiceComplete() {
    return this.product.stateChoice || this.product.stateChoiceArt;
  }

  isAmountComplete() {
    return this.product.amount.price;
  }

  onPhotoFaceChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.img.photoFaceSrc = reader.result as string;
      };
    }
  }

  onPhotoDosChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.img.photoDosSrc = reader.result as string;
      };
    }
  }

  onPhotoProfileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.img.photoProfileSrc = reader.result as string;
      };
    }
  }

  onPhotoGriffeChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.img.photoGriffeSrc = reader.result as string;
      };
    }
  }

  onPhoto5Change(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.img.photo5Src = reader.result as string;
      };
    }
  }

  onPhoto6Change(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.img.photo6Src = reader.result as string;
      };
    }
  }

  getcatalogType(catalogType) {
    if (catalogType === 'mode') {
      this.product.categoryArt = '';
      this.product.descriptionArt = '';
    } else {
      this.product.category = '';
      this.product.brand = '';
      this.product.model = '';
      this.product.description = '';
      this.product.color = '';
      this.product.matter = '';
    }
    return this.product.catalogType = catalogType;
  }

  addToSell() {
    console.log('form', this.product);
    this.router.navigate(['post-confirm'])
  }
}
