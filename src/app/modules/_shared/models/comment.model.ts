export class Comment {

	avatar = '';

	constructor(protected comment: any) {
		if (this.userImg) {
			const user = JSON.parse(this.userImg)[0];
			if (user.avatar) {
				this.avatar = user.avatar;
			} else {
				this.avatar = 'assets/img/default-img.svg';
			}
		}
	}

	get id(): number {
		return this.comment.id;
	}

	get message(): number {
		return this.comment.comment;
	}

	get productId(): number {
		return this.comment.productId;
	}

	get userId(): number {
		return this.comment.userId;
	}

	get createdAt(): string {
		return this.comment.createdAt;
	}

	get userName(): string {
		return this.comment.firstname;
	}

	get userImg(): string {
		return this.comment.userImg;
	}
}