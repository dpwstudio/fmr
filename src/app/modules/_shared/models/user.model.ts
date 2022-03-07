export interface User {
	id: number,
	firstname: string,
	lastname: string,
	email: string,
	phone: string,
	ctryCode: string,
	deliveryAddress: string,
	billingAddress: string,
	img: string,
	followersCounter: number,
	subscriptionsCounter: number,
	newsletters: boolean,
	cguAccepted: boolean,
	createdAt: string
}