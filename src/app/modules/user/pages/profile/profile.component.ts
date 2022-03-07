import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { CartService } from 'src/app/modules/_shared/services/cart/cart.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { UploadImageService } from 'src/app/modules/_shared/services/upload-image/upload-image.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private readonly notifier: NotifierService;
  productsArt = [];
  productsMens = [];
  productsWomens = [];
  productsKids = [];
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
  user: User;
  currentUser: User;
  users: User[];
  id: number;
  catalogType: string;

  editImgDressingForm: FormGroup;
  editImgGalleryForm: FormGroup;
  img = {
    dressingSrc: '',
    gallerySrc: '',
  }
  subscription: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private uploadImageService: UploadImageService,
    private authService: AuthService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.catalogType = params['catalogType']; // (+) converts string 'id' to a number
      this.getUser(this.id);
      // In a real app: dispatch action to load the details here.
    });

    this.editImgDressingForm = this.formBuilder.group({
      dressingUploaded: [""],
      dressing: [""],
    });
    
    this.editImgGalleryForm = this.formBuilder.group({
      galleryUploaded: [""],
      gallery: [""],
    });

    this.getProducts();
  }

  isMyProfile() {
    return this.authService.getCurrentUser().id === this.id;
  }

  /**
   * Récupère l'image du profil
   * @param user
   * @returns 
   */
  getUserImgProfile(user) {
    return this.userService.getUserImgProfile(user).avatar;
  }

  /**
   * Récupère l'image du dressing
   * @param user
   * @returns 
   */ 
  getUserImgDressing(user) {
    return this.userService.getUserImgProfile(user).dressing;
  }

  /**
   * Récupère l'image de la galerie
   * @param user
   * @returns 
   */
  getUserImgGallery(user) {
    return this.userService.getUserImgProfile(user).gallery;
  }

  getUser(id) {
    this.userService.getUser(id).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(users => {
      if (id) {
        this.user = users.filter(user => user.id === id)[0];
        console.log('this.user', this.user);
      }
      console.log('users', users);
    });
  }

  getProducts() {
    this.productService.getProducts().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(products => {
      if (this.user) {
        this.productsArt = products.filter(product => product.sellerId === this.user.id && product.catalogType === 'art');
        this.productsMens = products.filter(product => product.sellerId === this.user.id && product.kind === 'mens');
        this.productsWomens = products.filter(product => product.sellerId === this.user.id && product.kind === 'womens');
        this.productsKids = products.filter(product => product.sellerId === this.user.id && product.kind === 'kids');
      }
    })
  }

  trackById(index, item) {
    return item.id;
  }

  onPhotoDressingSelect(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    console.log('file', file)
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.editImgDressingForm.get('dressingUploaded').setValue(file);
        this.editImgDressingForm.get('dressing').setValue(file.name);
        this.img.dressingSrc = reader.result as string;
      };
    }
  }

  onPhotoGallerySelect(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    console.log('file', file)
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.editImgGalleryForm.get('galleryUploaded').setValue(file);
        this.editImgGalleryForm.get('gallery').setValue(file.name);
        this.img.gallerySrc = reader.result as string;
      };
    }
  }

  editImgDressing() {
    // stop here if form is invalid
    if (this.editImgDressingForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('uploadedImg', this.editImgDressingForm.get('dressingUploaded').value);
    formData.append('agentId', '007');

    this.subscription = this.userService.editImg(this.editImgDressingForm.value, 'dressing', this.currentUser.id).pipe(
      catchError(error => {
        this.notifier.notify('error', error.message)
        return throwError(error);
      })
    ).subscribe(res => {
      this.uploadImageService.sendPhotoToServer(formData);
      this.notifier.notify('success', 'L\'image du dressing a bien été mise à jour.');
      this.getUser(this.currentUser.id);
    });
  }

  editImgGallery() {
    // stop here if form is invalid
    if (this.editImgGalleryForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('uploadedImg', this.editImgGalleryForm.get('galleryUploaded').value);
    formData.append('agentId', '007');

    this.subscription = this.userService.editImg(this.editImgGalleryForm.value, 'gallery', this.currentUser.id).pipe(
      catchError(error => {
        this.notifier.notify('error', error.message)
        return throwError(error);
      })
    ).subscribe(res => {
      this.uploadImageService.sendPhotoToServer(formData);
      this.notifier.notify('success', 'L\'image de la galerie a bien été mise à jour.');
      this.getUser(this.currentUser.id);
    });
  }

  followProfile(user) {
    console.log('user', user);
    this.notifier.notify('success', `Vous êtes maintenant abonné au profil de ${user.firstname}`)
  }

  addProductToCart(product) {
    product.quantity = this.quantity;
    this.cartService.addProductToCart(product);
  }

  isCatalogArt() {
    return this.catalogType === 'art';
  }

  isKindMens(product) {
    return product.kind === 'mens';
  }

  isKindWomens(product) {
    return product.kind === 'womens';
  }

  isKindKids(product) {
    return product.kind === 'kids';
  }

  isArtProduct(product) {
    return product.category === 'art';
  }
}
