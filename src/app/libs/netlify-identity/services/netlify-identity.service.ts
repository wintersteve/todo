import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import {
	catchError,
	filter,
	map,
	pluck,
	skipUntil,
	switchMap,
	take,
	tap,
} from 'rxjs/operators';
import { NetlifyEvent, NetlifyIdentity, Token, User } from '../models';
import { ENDPOINT } from '../netlify-identity.config';
import { NETLIFY_IDENTITY_TOKEN } from '../netlify-identity.token';

@Injectable({
	providedIn: 'root',
})
export class NetlifyIdentityService {
	private readonly _isInitialized$ = new BehaviorSubject<boolean>(false);
	private readonly _user$ = new BehaviorSubject<User>(undefined);

	private isInitialized$ = this._isInitialized$.asObservable().pipe(
		filter((isInitialized) => !!isInitialized),
		take(1)
	);

	constructor(
		@Inject(NETLIFY_IDENTITY_TOKEN)
		private readonly netlifyIdentityAdapter: NetlifyIdentity,
		private readonly http: HttpClient,
		private readonly location: Location,
		private readonly router: Router,
		private readonly zone: NgZone
	) {
		this.handleInitialization();
		this.handleLogin();
	}

	public get user$(): Observable<User> {
		return this._user$.asObservable();
	}

	public getToken(): Observable<Token> {
		return of(this.netlifyIdentityAdapter.currentUser()).pipe(pluck('token'));
	}

	public getUser(): Observable<User> {
		return this.isInitialized$.pipe(
			map(() => this.netlifyIdentityAdapter.currentUser()),
			tap((user) => this._user$.next(user))
		);
	}

	public logout(cb: CallableFunction): void {
		this.netlifyIdentityAdapter.logout().then(() => this.zone.run(() => cb()));
	}

	public openModal(): void {
		this.netlifyIdentityAdapter.open();
	}

	public isLoggedIn(): Observable<boolean> {
		return this.getUser().pipe(
			skipUntil(this.isInitialized$),
			map((user) => user?.token?.access_token),
			switchMap((token) =>
				token
					? this.http
							.get<User>(ENDPOINT, {
								headers: { Authorization: `bearer ${token}` },
							})
							.pipe(map((user) => !!user.id))
					: of(false)
			),
			catchError((error) => {
				this.logout(() => this.router.navigate(['/login']));

				return throwError(error);
			})
		);
	}

	private handleInitialization(): void {
		if (this.netlifyIdentityAdapter) return this._isInitialized$.next(true);

		this.netlifyIdentityAdapter.on(NetlifyEvent.INIT, () => {
			this.zone.run(() => this._isInitialized$.next(true));
		});
	}

	private handleLogin(): void {
		if (this.location.path() !== '/') {
			this.netlifyIdentityAdapter.on(NetlifyEvent.LOGIN, () =>
				this.zone.run(() => {
					this.netlifyIdentityAdapter.close();
					this.router.navigate(['/']);
				})
			);
		}
	}
}
