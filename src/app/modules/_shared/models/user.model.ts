export interface User {
	id: number,
	firstname: string,
	lastname: string,
	email: string,
	password: string,
	phone: string,
	ctryCode: string,
	deliveryAddress: string,
	billingAddress: string,
	img: {
		avatar: string,
		dressing: string,
		gallery: string
	},
	followers: number,
	subscription: number,
	newsletters: boolean,
	cguAccepted: boolean,
	createdAt: string
}