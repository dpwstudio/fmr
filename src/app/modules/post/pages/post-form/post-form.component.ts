import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { fromEvent, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { ProductService } from 'src/app/modules/_shared/services/product/product.service';
import { UploadImageService } from 'src/app/modules/_shared/services/upload-image/upload-image.service';
import { UserService } from 'src/app/modules/_shared/services/user/user.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  private readonly notifier: NotifierService;
  @ViewChild('searchElementRef', { static: true }) searchElementRef: ElementRef<HTMLInputElement>;
  product = {
    img: {
      photoFaceSrc: '',
      photoDosSrc: '',
      photoProfileSrc: '',
      photoGriffeSrc: '',
      photo5Src: '',
      photo6Src: '',
    },
    catalogType: 'mode',
    kind: 'mens',
    category: '',
    brand: '',
    model: '',
    matter: '',
    color: '',
    description: '',
    stateChoice: '',
    dimensions: {
      width: '',
      height: '',
      length: '',
    },
    amount: {
      price: null,
      fallingPrice: null,
      amountWin: null,
    },
    createdAt: moment().format()
  }
  currentUser: User;
  postProductForm: FormGroup;
  subscription: Subscription;
  categories = [];
  catalogMode = [];
  catalogArt = [];
  brands = [];
  search: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private uploadImageService: UploadImageService,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.postProductForm = this.formBuilder.group({
      photoFace: [''],
      photoFaceUploaded: [''],
      photoDos: [''],
      photoDosUploaded: [''],
      photoProfile: [''],
      photoProfileUploaded: [''],
      photoGriffe: [''],
      photoGriffeUploaded: [''],
      photo5: [''],
      photo5Uploaded: [''],
      photo6: [''],
      photo6Uploaded: [''],
      catalogType: [''],
      category: [''],
      kind: [''],
      brand: [''],
      model: [''],
      matter: [''],
      color: [''],
      description: [''],
      height: [''],
      width: [''],
      length: [''],
      size: [''],
      sizeType: [''],
      diameter: [''],
      stateChoice: [''],
      invoice: [''],
      certificate: [''],
      noProof: [''],
      price: [''],
      amountWin: [''],
      userId: [''],
      userImg: [''],
      userName: [''],
      userCountry: [''],
    });

    this.postProductForm.patchValue({
      catalogType: this.product.catalogType,
      kind: this.product.kind,
      category: this.product.category,
      userId: this.currentUser.id,
      userImg: this.currentUser.img,
      userName: this.currentUser.firstname,
      userCountry: this.currentUser,
    });
    this.getCategories();
    this.initSearchInputHandler();
    this.getBrands();
  }

  getCategories() {
    this.subscription = this.productService.getCategories().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(categories => {
      this.catalogMode = categories.filter(category => category.type === 'mode');
      this.catalogArt = categories.filter(category => category.type === 'art');
      this.categories = this.catalogMode;
      this.sortCategories(this.categories);
    })
  }

  getBrands(textToSearch?) {
    console.log('textToSearch', textToSearch)
    this.subscription = this.productService.getBrands().pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(brands => {
      if (textToSearch) {
        this.brands = brands.filter(brand => brand.value.toLowerCase().indexOf(textToSearch.toLowerCase()) > -1);
      } else {
        this.brands = brands;
      }
      this.sortBrands(this.brands);
    })
  }

  sortCategories(categories) {
    categories.sort((a, b) => {
      let fa = a.value,
        fb = b.value;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  sortBrands(brands) {
    brands.sort((a, b) => {
      let fa = a.value,
        fb = b.value;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  get f() {
    return this.postProductForm.controls;
  }

  isPhotosComplete() {
    return this.f.photoFace.value
      && this.f.photoDos.value
      && this.f.photoProfile.value
      && this.f.photoGriffe.value
      || this.f.photo5.value
      || this.f.photo6.value;
  }

  isDescriptionComplete() {
    return this.f.category.value
      && this.f.brand.value
      && this.f.model.value
      && this.f.matter.value
      && this.f.color.value
      && this.f.description.value;
  }

  isDimensionsComplete() {
    return this.f.width.value
      && this.f.height.value
      && this.f.length.value
      || this.f.size.value && this.f.sizeType.value
      || this.f.diameter.value;
  }

  isStateChoiceComplete() {
    return this.f.stateChoice.value;
  }

  isAuthenticityComplete() {
    return this.f.invoice.value
      || this.f.certificate.value
      || this.f.noProof.value;
  }

  isAmountComplete() {
    return this.f.price.value;
  }

  resetImage(img) {
    if (img === 'photoFaceSrc') {
      this.product.img.photoFaceSrc = '';
      this.postProductForm.get('photoFaceUploaded').setValue('');
      this.postProductForm.get('photoFace').setValue('');
    } else if (img === 'photoDosSrc') {
      this.product.img.photoDosSrc = '';
      this.postProductForm.get('photoDosUploaded').setValue('');
      this.postProductForm.get('photoDos').setValue('');
    } else if (img === 'photoProfileSrc') {
      this.product.img.photoProfileSrc = '';
      this.postProductForm.get('photoProfileUploaded').setValue('');
      this.postProductForm.get('photoProfile').setValue('');
    } else if (img === 'photoGriffeSrc') {
      this.product.img.photoGriffeSrc = '';
      this.postProductForm.get('photoGriffeUploaded').setValue('');
      this.postProductForm.get('photoGriffe').setValue('');
    } else if (img === 'photo5Src') {
      this.product.img.photo5Src = '';
      this.postProductForm.get('photo5Uploaded').setValue('');
      this.postProductForm.get('photo5').setValue('');
    } else {
      this.product.img.photo6Src = '';
      this.postProductForm.get('photo6Uploaded').setValue('');
      this.postProductForm.get('photo6').setValue('');
    }
  }

  onPhotoFaceChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.postProductForm.get('photoFaceUploaded').setValue(file);
        this.postProductForm.get('photoFace').setValue(file.name);
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
        this.postProductForm.get('photoDosUploaded').setValue(file);
        this.postProductForm.get('photoDos').setValue(file.name);
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
        this.postProductForm.get('photoProfileUploaded').setValue(file);
        this.postProductForm.get('photoProfile').setValue(file.name);
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
        this.postProductForm.get('photoGriffeUploaded').setValue(file);
        this.postProductForm.get('photoGriffe').setValue(file.name);
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
        this.postProductForm.get('photo5Uploaded').setValue(file);
        this.postProductForm.get('photo5').setValue(file.name);
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
        this.postProductForm.get('photo6Uploaded').setValue(file);
        this.postProductForm.get('photo6').setValue(file.name);
        this.product.img.photo6Src = reader.result as string;
      };
    }
  }

  getCatalogType(catalogType) {
    console.log('catalogType', catalogType);
    if (catalogType === 'mode') {
      this.categories = this.catalogMode;
      console.log('this.categories', this.categories);
      this.postProductForm.patchValue({
        catalogType: 'mode',
        category: '',
        description: '',
      });
    } else {
      this.categories = this.catalogArt;
      console.log('this.categories', this.categories);
      this.postProductForm.patchValue({
        catalogType: 'art',
        category: '',
        brand: '',
        model: '',
        description: '',
        color: '',
        matter: '',
      });
    }
    return this.product.catalogType = catalogType;
  }

  getKind(kind) {
    this.postProductForm.patchValue({
      kind: kind,
    });
    return this.product.kind = kind;
  }

  addProduct() {
    console.log('form', this.postProductForm);
    // stop here if form is invalid
    if (this.postProductForm.invalid) {
      this.notifier.notify('error', 'Veuillez renseigner tous les champs.')
      return;
    }
    const files = [];
    files.push(this.postProductForm.get('photoFaceUploaded').value)
    files.push(this.postProductForm.get('photoDosUploaded').value)
    files.push(this.postProductForm.get('photoProfileUploaded').value)
    files.push(this.postProductForm.get('photoGriffeUploaded').value)
    files.push(this.postProductForm.get('photo5Uploaded').value)
    files.push(this.postProductForm.get('photo6Uploaded').value)
    console.log('files', files);

    this.subscription = this.productService.createProduct(this.postProductForm.value).pipe(
      catchError(error => {
        this.notifier.notify('error', error.message)
        return throwError(error);
      })
    ).subscribe((res: { message: string, idProduct: number }) => {
      console.log('res', res);
      this.postProductForm.reset();
      this.uploadImageService.sendMultiplePhotosToServer(files);
      this.router.navigate(['post-confirm', res.idProduct]);
    });
  }

  onPriceChange(event) {
    const amountWin = event * 0.89;
    this.product.amount.amountWin = amountWin.toFixed(2);
    this.postProductForm.patchValue({
      price: event,
      amountWin: parseFloat(this.product.amount.amountWin),
    });
  }

  searchProduct() {
    if (this.search) {
      console.log('this.search', this.search)
      this.brands = this.brands.filter(
        brand => brand.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
      console.log('brands', this.brands);
    } else {
      this.getBrands();
    }
  }

  initSearchInputHandler() {
    fromEvent(this.searchElementRef.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
    ).subscribe(textToSearch => {
      console.log('textToSearch', textToSearch);
      this.search = textToSearch;
      this.getBrands(textToSearch);
    })
  }

  emptySearch() {
    this.search = '';
    this.getBrands(this.search);
  }


}
