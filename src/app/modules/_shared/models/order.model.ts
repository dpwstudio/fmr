export interface Order {
	id?: number;
	clientName: string;
	email: string;
	localization: string;
	total: number;
	carts: string;
	status: string;
	createdAt?: Date;
	userId: number;
}