export interface NotificationUser {
	id?: number;
	type: string;
	message: string;
	userIdToNotify: number;
	img?: string;
	status: string;
	notifiedAt?: string;
}