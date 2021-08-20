import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
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

	canActivate(
		_: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | boolean {
		if (state.url === '/#demo') return true;

		return this.netlifyIdentity
			.isLoggedIn()
			.pipe(
				map((isLoggedIn) =>
					isLoggedIn ? isLoggedIn : this.router.createUrlTree(['/login'])
				)
			);
	}
}
