export interface Product {
	id?: number;
	stripeId?: string;
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
	typeProduct: string;
	category: string;
	brand: string;
	model: string;
	matter: string;
	color: string;
	description: string;
	categoryArt: string;
	descriptionArt: string;
	stateChoice: string;
	stateChoiceArt: string;
	width: string;
	height: string;
	depth: string;
	amount: string;
	amountWin: string;
	createdAt?: string;
}