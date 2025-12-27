const GUEST_USER_ID = 'guest';

export class User {
	constructor(
		public readonly id: string = GUEST_USER_ID,
		private _token: string = '',
	) {}

	public get accessToken(): string {
		return this._token;
	}
	public get displayName(): string {
		return `User-${this.id}`;
	}
	public get roles(): string[] {
		return ['admin'];
	}
	public get isGuestUser(): boolean {
		return this.id === GUEST_USER_ID;
	}
}
