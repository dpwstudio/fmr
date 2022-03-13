export interface ProductModel {
	id?: number;
	stripeId?: string;
	img: {
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
	}
	catalogType: string;
	category: string;
	kind: string;
	brand: string;
	model: string;
	matter: string;
	color: string;
	description: string;
	stateChoice: string;
	dimensions: {
		width: string;
		height: string;
		length: string;
	},
	amount: {
		price: number;
		fallingPrice: number;
		amountWin: string;
	}
	like?: string;
	url?: string;
	createdAt?: string;

	/**
	 * USER INFO
	 */
	sellerId?: number,
	sellerName?: string,
	sellerImg?: string,
	sellerCountry?: string
}