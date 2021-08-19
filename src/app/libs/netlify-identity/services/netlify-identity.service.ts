import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NetlifyIdentity, User } from '../models';
import { ENDPOINT } from '../netlify-identity.config';
import { NETLIFY_IDENTITY_TOKEN } from '../netlify-identity.token';

@Injectable({
	providedIn: 'root',
})
export class NetlifyIdentityService {
	constructor(
		@Inject(NETLIFY_IDENTITY_TOKEN)
		private readonly netlifyIdentityAdapter: NetlifyIdentity,
		private readonly http: HttpClient
	) {}

	public getUser(): Observable<User> {
		return of(this.netlifyIdentityAdapter.currentUser());
	}

	public logout(): Observable<null> {
		return from(this.netlifyIdentityAdapter.logout());
	}

	public openModal(): void {
		this.netlifyIdentityAdapter.open();
	}

	public isLoggedIn(): Observable<boolean> {
		return this.getUser().pipe(
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
