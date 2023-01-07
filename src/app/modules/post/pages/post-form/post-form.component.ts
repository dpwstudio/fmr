import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { fromEvent, Subscription, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { User } from 'src/app/modules/_shared/models/user.model';
import { AuthService } from 'src/app/modules/_shared/services/auth/auth.service';
import { NotificationsService } from 'src/app/modules/_shared/services/notifications/notifications.service';
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
	subJewelryCategories = [];
	subAccessoiresCategories = [];
	subVetementsCategories = [];
	subChaussuresCategories = [];
	subMontresCategories = [];
	subSacsCategories = [];
	catalogMode = [];
	catalogArt = [];
	brands = [];
	mattersAll = [];
	mattersJewelry = [];
	search: string;
	returnUrl = '';

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private uploadImageService: UploadImageService,
		private authService: AuthService,
		private userService: UserService,
		private productService: ProductService,
		private route: ActivatedRoute,
		private notificationService: NotificationsService,
		notifierService: NotifierService
	) {
		this.notifier = notifierService;
	}

	ngOnInit(): void {
		this.currentUser = this.authService.getCurrentUser();
		this.returnUrl = this.route.snapshot.routeConfig.path || '/';
		console.log('this.route.snapshot', this.route.snapshot);
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
			subCategory: [''],
			kind: [''],
			brand: [''],
			model: [''],
			matter: [''],
			color: [''],
			description: ['', Validators.required],
			height: [''],
			width: [''],
			length: [''],
			size: [''],
			sizeType: [''],
			diameter: [''],
			sizeClothes: [''],
			stateChoice: [''],
			invoice: [''],
			certificate: [''],
			noProof: [''],
			price: [''],
			user: [''],
			amountWin: [''],
			userId: [''],
		});

		this.postProductForm.patchValue({
			catalogType: this.product.catalogType,
			kind: this.product.kind,
			category: this.product.category,
			user: JSON.stringify([{
				imgProfile: this.currentUser.img,
				country: this.getCountryUserProfile(this.currentUser.deliveryAddress),
				firstname: this.currentUser.firstname
			}]),
			userId: this.currentUser.id
		});
		this.getCategories();
		this.getSubCategories();
		this.initSearchInputHandler();
		this.getBrands();
		this.getMatters();
		this.getColors();
	}

	getCountryUserProfile(address) {
		return this.userService.getCountryUserProfile(address);
	}

	getCategories() {
		this.subscription = this.productService.getCategories().pipe(
			catchError(error => {
				return throwError(error);
			})
		).subscribe(categories => {
			this.catalogMode = categories.filter(category => category.type === 'mode' && category.gender === 'womens');
			this.catalogArt = categories.filter(category => category.type === 'art');
			this.categories = this.catalogMode;
			this.sort(this.categories);
		})
	}

	getSubCategories() {
		this.subscription = this.productService.getSubCategories().pipe(
			catchError(error => {
				return throwError(error);
			})
		).subscribe(subCategories => {
			this.subJewelryCategories = subCategories.filter(subCategory => subCategory.category === 'joaillerie');
			this.subAccessoiresCategories = subCategories.filter(subCategory => subCategory.category === 'accessoires');
			this.subVetementsCategories = subCategories.filter(subCategory => subCategory.category === 'vêtements');
			this.subChaussuresCategories = subCategories.filter(subCategory => subCategory.category === 'chaussures');
			this.subMontresCategories = subCategories.filter(subCategory => subCategory.category === 'montres');
			this.subSacsCategories = subCategories.filter(subCategory => subCategory.category === 'sacs');
			this.sort(this.subJewelryCategories);
			this.sort(this.subAccessoiresCategories);
			this.sort(this.subVetementsCategories);
			this.sort(this.subChaussuresCategories);
			this.sort(this.subMontresCategories);
			this.sort(this.subSacsCategories);
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
			this.sort(this.brands);
		})
	}

	getMatters() {
		this.subscription = this.productService.getMatters().pipe(
			catchError(error => {
				return throwError(error);
			})
		).subscribe(matters => {
			console.log('matters', matters);
			this.mattersAll = matters.filter(matter => matter.category === 'all');
			this.mattersJewelry = matters.filter(matter => matter.category === 'jewelry');
			this.sort(this.mattersAll);
			this.sort(this.mattersJewelry);
		})
	}


	getColors() {
		return ['argenté', 'beige', 'blanc', 'bleu', 'bordeaux', 'camel', 'doré', 'gris', 'jaune', 'marine', 'marron', 'multicolore', 'noir', 'orange', 'rose', 'rouge', 'vert', 'violet', 'autre'];
	}

	sort(datas) {
		datas.sort((a, b) => {
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

	isUpper(str) {
		return !/[a-z]/.test(str) && /[A-Z]/.test(str);
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
			|| this.f.diameter.value
			|| this.f.sizeClothes.value;
	}

	isMatterComplete() {
		return this.f.matter.value;
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
				height: '',
				width: '',
				length: '',
			});
		} else {
			this.categories = this.catalogArt;
			console.log('this.categories', this.categories);
			this.postProductForm.patchValue({
				catalogType: 'art',
				category: '',
				subCategory: '',
				brand: '',
				model: '',
				description: '',
				color: '',
				matter: '',
				height: '',
				width: '',
				length: '',
				size: '',
				sizeType: '',
				diameter: '',
				sizeClothes: '',
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
		// stop here if form is invalid
		if (this.postProductForm.invalid
			&& !this.isPhotosComplete()
			&& !this.isDescriptionComplete()
			&& !this.isDimensionsComplete()
			&& !this.isStateChoiceComplete()
			&& !this.isAuthenticityComplete()
			&& !this.isAmountComplete()
		) {
			this.notifier.notify('error', 'Le formulaire est incomplet, veuillez saisir les champs manquants.')
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
			this.uploadImageService.sendMultiplePhotosToServer(files);
			this.router.navigate(['post-confirm', res.idProduct]);
			this.createNotification(
				'post',
				this.postProductForm.value,
				this.currentUser
			);
			this.postProductForm.reset();
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

	createNotification(type, to, from) {
		this.notificationService.addNotification(type, to, from).pipe(
			catchError(error => {
				return throwError(error);
			})
		).subscribe(res => console.log('res', res));
	}

	showDimensions() {
		return this.f.subCategory.value !== 'lunettes'
			&& this.f.subCategory.value !== 'bracelets'
			&& this.f.subCategory.value !== 'colliers'
			&& this.f.subCategory.value !== 'boucles d\'oreilles';
	}

	showDimensionsWithLengthWidthHeight() {
		console.log('', this.f)
		return this.f.category.value === 'sacs'
			|| this.f.catalogType.value === 'art'
			|| this.f.category.value === ''
			|| this.f.category.value === 'accessoires'
			|| this.f.subCategory.value === 'petite maroquinerie'
			|| this.f.subCategory.value === 'carrés'
			|| this.f.subCategory.value === 'portefeuilles'
			&& this.f.subCategory.value !== 'chapeaux';
	}

	showDimensionsWithSizeType() {
		return this.f.category.value === 'chaussures'
			|| this.f.subCategory.value === 'chapeaux';
	}

	showDimensionsWithDiameter() {
		return this.f.category.value === 'montres'
			|| this.f.category.value === 'joaillerie'
			&& this.f.subCategory.value === 'bagues';
	}

	showDimensionsWithSize() {
		return this.f.category.value === 'vêtements' || this.f.category.value === 'ceintures' || this.f.category.value === 'gants';
	}

	showMatter() {
		return this.f.subCategory.value !== 'bracelets'
			&& this.f.subCategory.value !== 'colliers'
			&& this.f.subCategory.value !== 'boucles d\'oreilles';
	}

	showColor() {
		return this.f.subCategory.value !== 'bracelets'
			&& this.f.subCategory.value !== 'colliers'
			&& this.f.subCategory.value !== 'boucles d\'oreilles';
	}

}
