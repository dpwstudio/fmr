export class Product {

	photoFace = '';
	photoDos = '';
	photoProfile = '';
	photoGriffe = '';
	photo5 = '';
	photo6 = '';
	invoice = false;
	certificate = false;
	noProof = false;
	price = 0;
	amountWin = 0;
	fallingPrice = 0;
	avatar = '';
	userName = '';
	userId = 0;
	width = 0;
	height = 0;
	length = 0;
	size = 0;
	sizeType = '';
	diameter = 0;

	constructor(protected product: any) {
		if (this.img) {
			const img = JSON.parse(this.img)[0];
			this.photoFace = img.photoFace;
			this.photoDos = img.photoDos;
			this.photoProfile = img.photoProfile;
			this.photoGriffe = img.photoGriffe;
			this.photo5 = img.photo5;
			this.photo6 = img.photo6;
		}
		if (this.dimensions) {
			const dimensions = JSON.parse(this.dimensions)[0];
			this.width = dimensions.width;
			this.height = dimensions.height;
			this.length = dimensions.length;
			this.size = dimensions.size;
			this.sizeType = dimensions.sizeType;
			this.diameter = dimensions.diameter;
		}
		if (this.authenticity) {
			const authenticity = JSON.parse(this.authenticity)[0];
			this.invoice = authenticity.invoice;
			this.certificate = authenticity.certificate;
			this.noProof = authenticity.noProof;
		}
		if (this.amount) {
			const amount = JSON.parse(this.amount)[0];
			this.price = amount.price;
			this.amountWin = amount.amountWin;
			this.fallingPrice = amount.fallingPrice ? amount.fallingPrice : null;
		}
		if (this.user) {
			const user = JSON.parse(this.user)[0];
			if (user.userImg) {
				const userImg = JSON.parse(user.userImg)[0];
				this.avatar = userImg.avatar;
			} else {
				this.avatar = 'assets/img/default-img.svg';
			}
			this.userName = user.userName;
			this.userId = user.userId;
		}
	}

	get id(): number {
		return this.product.id;
	}

	get brand() {
		return this.product.brand;
	}

	get img(): string {
		return this.product.img;
	}

	get catalogType(): string {
		return this.product.catalogType;
	}

	get category(): string {
		return this.product.category;
	}

	get kind(): string {
		return this.product.kind;
	}

	get model(): string {
		return this.product.model;
	}

	get matter(): string {
		return this.product.matter;
	}

	get color(): string {
		return this.product.color;
	}

	get description(): string {
		return this.product.description;
	}

	get stateChoice(): string {
		return this.product.stateChoice;
	}

	get dimensions(): string {
		return this.product.dimensions;
	}

	get amount(): string {
		return this.product.amount;
	}
	
	get authenticity(): string {
		return this.product.authenticity;
	}

	get like(): string {
		return this.product.like;
	}

	get url(): string {
		return this.product.url;
	}

	get createdAt(): string {
		return this.product.createdAt;
	}

	get user(): string {
		return this.product.user;
	}
}