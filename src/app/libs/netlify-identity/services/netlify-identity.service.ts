import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, skipUntil, switchMap } from 'rxjs/operators';
import { NetlifyEvent, NetlifyIdentity, User } from '../models';
import { ENDPOINT } from '../netlify-identity.config';
import { NETLIFY_IDENTITY_TOKEN } from '../netlify-identity.token';

@Injectable({
	providedIn: 'root',
})
export class NetlifyIdentityService {
	private readonly _isInitialized$ = new BehaviorSubject<boolean>(false);

	private isInitialized$ = this._isInitialized$
		.asObservable()
		.pipe(filter((isInitialized) => !!isInitialized));

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

	public getUser(): Observable<User> {
		return this.isInitialized$.pipe(
			map(() => this.netlifyIdentityAdapter.currentUser())
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
			)
		);
	}

	private handleInitialization(): void {
		this.netlifyIdentityAdapter.on(NetlifyEvent.INIT, () =>
			this.zone.run(() => this._isInitialized$.next(true))
		);
	}

	private handleLogin(): void {
		if (this.location.path() === '/login') {
			this.netlifyIdentityAdapter.on(NetlifyEvent.LOGIN, () =>
				this.zone.run(() => {
					this.netlifyIdentityAdapter.close();
					this.router.navigate(['/']);
				})
			);
		}
	}
}
