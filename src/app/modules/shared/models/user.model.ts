export interface User {
	id: number;
	lastname: string;
	firstname: string;
	email: string;
	password: string;
	address: string;
	zipcode: string;
	city: string;
	phone: string;
	newsletter: number;
	role: string;
	createdAt?: Date;
}