import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
	updated_at: '2021-08-17T20:57:55Z';
	url: 'https://angular-jamstack-todo.netlify.app/.netlify/identity';
	user_metadata: { full_name: 'Steve' };
}

const STORAGE_KEY = 'gotrue.user';

export const STORAGE_TOKEN = new InjectionToken<Storage>('storage');

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _user$ = new BehaviorSubject(undefined);

	constructor(
		@Inject(STORAGE_TOKEN) private readonly localStorage: Storage,
		private readonly http: HttpClient
	) {
		const user = JSON.parse(this.localStorage.getItem(STORAGE_KEY));

		this._user$.next(user);
	}

	public getUser(): Observable<unknown> {
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
}