export interface Cart {
	product: {
		id: number;
		brand: string;
		model: string;
	}
	photoFace: string,
	photoDos: string,
	photoProfile: string,
	photoGriffe: string,
	photo5: string,
	photo6: string,
	description: string;
	quantity: number;
	price: number;
}