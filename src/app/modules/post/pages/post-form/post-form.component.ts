import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  loading = false;
  /**
   * Photo de face
   */
  photoFace: string;
  photoFaceSrc: string;

  /**
   * Photo de dos
   */
  photoDos: string;
  photoDosSrc: string;

  /**
   * Photo de profil
   */
  photoProfile: string;
  photoProfileSrc: string;

  /**
   * Photo de la griffe
   */
  photoGriffe: string;
  photoGriffeSrc: string;

  /**
   * Photo 5 (facultative)
   */
  photo5: string;
  photo5Src: string;

  /**
   * Photo 6 (facultative)
   */
  photo6: string;
  photo6Src: string;

  category: string = "";
  brand: string;
  model: string;
  matter: string;
  color: string;
  description: string;
  categoryArt: string = "";
  descriptionArt: string;
  stateChoice: string;
  stateChoiceArt: string;
  width: string;
  height: string;
  depth: string;
  amount: string;
  amountWin: string;
  createdAt = new Date();


  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  isPhotosComplete() {
    return this.photoFace
      && this.photoDos
      && this.photoProfile
      && this.photoGriffe
      || this.photo5
      || this.photo6;
  }

  isDescriptionComplete() {
    return this.category
      && this.brand
      && this.model
      && this.matter
      && this.color
      && this.description;
  }

  isDimensionsComplete() {
    return this.width
      && this.height
      && this.depth;
  }

  isStateChoiceComplete() {
    return this.stateChoice || this.stateChoiceArt;
  }

  isAmountComplete() {
    return this.amount;
  }

  onPhotoFaceChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log('reader', reader.result);
        this.photoFaceSrc = reader.result as string;
      };
    }
  }

  onPhotoDosChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.photoDosSrc = reader.result as string;
      };
    }
  }

  onPhotoProfileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.photoProfileSrc = reader.result as string;
      };
    }
  }

  onPhotoGriffeChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.photoGriffeSrc = reader.result as string;
      };
    }
  }

  onPhoto5Change(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.photo5Src = reader.result as string;
      };
    }
  }

  onPhoto6Change(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.photo6Src = reader.result as string;
      };
    }
  }

  addToSell() {
    console.log('form');
  }
}
