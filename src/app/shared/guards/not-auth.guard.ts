import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {}

	canActivate(): Observable<boolean | UrlTree> {
		return this.authService
			.getUser()
			.pipe(map((user) => (user ? this.router.createUrlTree(['/']) : true)));
	}
}
