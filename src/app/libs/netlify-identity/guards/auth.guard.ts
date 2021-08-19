import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NetlifyIdentityService } from '../services/netlify-identity.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private readonly netlifyIdentity: NetlifyIdentityService,
		private readonly router: Router
	) {}

	canActivate(): Observable<boolean | UrlTree> {
		return this.netlifyIdentity
			.isLoggedIn()
			.pipe(
				map((isLoggedIn) =>
					isLoggedIn ? isLoggedIn : this.router.createUrlTree(['/login'])
				)
			);
	}
}
