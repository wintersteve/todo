import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NetlifyIdentityService } from '../services/netlify-identity.service';

@Injectable({
	providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
	constructor(
		private readonly netlifyIdentity: NetlifyIdentityService,
		private readonly router: Router
	) {}

	canActivate(): Observable<boolean | UrlTree> {
		return this.netlifyIdentity
			.getUser()
			.pipe(map((user) => (user ? this.router.createUrlTree(['/']) : true)));
	}
}
