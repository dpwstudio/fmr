export interface User {
	id: number,
	firstname: string,
	lastname: string,
	email: string,
	password: string,
	phone: string,
	ctryCode: string,
	deliveryAddress: {
		address: string,
		cp: string,
		city: string,
		country: string
	},
	billingAddress: {
		address: string,
		cp: string,
		city: string,
		country: string
	},
	img: {
		avatar: string,
		dressing: string,
		gallery: string
	},
	followers: number,
	subscription: number,
	createdAt: string
}