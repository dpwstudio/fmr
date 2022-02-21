import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Product } from 'src/app/modules/shared/models/product.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  loading = false;

  product: Product = {
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
    typeProduct: 'mode',
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
    width: '',
    height: '',
    depth: '',
    amount: '',
    amountWin: '',
    createdAt: moment().format()
  }


  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  isPhotosComplete() {
    return this.product.photoFace
      && this.product.photoDos
      && this.product.photoProfile
      && this.product.photoGriffe
      || this.product.photo5
      || this.product.photo6;
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
    return this.product.width
      && this.product.height
      && this.product.depth;
  }

  isStateChoiceComplete() {
    return this.product.stateChoice || this.product.stateChoiceArt;
  }

  isAmountComplete() {
    return this.product.amount;
  }

  onPhotoFaceChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.photoFaceSrc = reader.result as string;
      };
    }
  }

  onPhotoDosChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.photoDosSrc = reader.result as string;
      };
    }
  }

  onPhotoProfileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.photoProfileSrc = reader.result as string;
      };
    }
  }

  onPhotoGriffeChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.photoGriffeSrc = reader.result as string;
      };
    }
  }

  onPhoto5Change(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.photo5Src = reader.result as string;
      };
    }
  }

  onPhoto6Change(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.product.photo6Src = reader.result as string;
      };
    }
  }

  getTypeProduct(typeProduct) {
    if (typeProduct === 'mode') {
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
    return this.product.typeProduct = typeProduct;
  }

  addToSell() {
    console.log('form', this.product);
  }
}
