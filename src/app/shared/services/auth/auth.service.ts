import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface NetlifyIdentity {
	logout: () => void;
}

declare global {
	interface Window {
		netlifyIdentity: NetlifyIdentity;
	}
}

interface Token {
	access_token: string;
	token_type: 'bearer';
	expires_in: number;
	refresh_token: string;
	expires_at: number;
}

interface User {
	app_metadata: { provider: 'email' };
	aud: string;
	confirmation_sent_at: string;
	confirmed_at: string;
	created_at: string;
	email: string;
	id: string;
	recovery_sent_at: string;
	role: string;
	token: Token;
	updated_at: string;
	url: string;
	user_metadata: { full_name: string };
}

const STORAGE_KEY = 'gotrue.user';
const WINDOW_KEY = 'window';

export const STORAGE_TOKEN = new InjectionToken<Storage>('storage');
export const WINDOW_TOKEN = new InjectionToken<Window>('window');

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _user$ = new BehaviorSubject<User>(undefined);

	constructor(
		@Inject(STORAGE_TOKEN) private readonly localStorage: Storage,
		@Inject(WINDOW_TOKEN) private readonly window: Window,
		private readonly http: HttpClient
	) {
		const user = JSON.parse(this.localStorage.getItem(STORAGE_KEY));

		this._user$.next(user);
	}

	public getUser(): Observable<User> {
		return this._user$.asObservable();
	}

	public isLoggedIn(): Observable<boolean> {
		return this.http
			.get<User>(
				'https://angular-jamstack-todo.netlify.app/.netlify/identity/user',
				{
					headers: {
						Authorization: `bearer ${this._user$.value.token.access_token}`,
					},
				}
			)
			.pipe(map((user) => !!user.id));
	}

	public logout(): void {
		this.window.netlifyIdentity.logout();
		this._user$.next(undefined);
	}
}
