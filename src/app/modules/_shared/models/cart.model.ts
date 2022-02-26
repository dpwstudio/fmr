export interface Cart {
	id: number;
	brand: string;
	model: string;
	img: {
		photoFace: string,
		photoDos: string,
		photoProfile: string,
		photoGriffe: string,
		photo5: string,
		photo6: string,
	};
	description: string;
	quantity: number;
	amount: {
		price: number;
	}
}