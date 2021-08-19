import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
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
		private readonly http: HttpClient
	) {
		netlifyIdentityAdapter.on(NetlifyEvent.INIT, () =>
			this._isInitialized$.next(true)
		);
	}

	public getUser(): Observable<User> {
		return this.isInitialized$.pipe(
			map(() => this.netlifyIdentityAdapter.currentUser())
		);
	}

	public logout(): Observable<null> {
		return from(this.netlifyIdentityAdapter.logout());
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
}
