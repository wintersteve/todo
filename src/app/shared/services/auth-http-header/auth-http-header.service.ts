import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck, take } from 'rxjs/operators';
import { Token } from 'src/app/libs/netlify-identity/models';
import { NetlifyIdentityService } from 'src/app/libs/netlify-identity/services/netlify-identity.service';

@Injectable({
	providedIn: 'root',
})
export class AuthHttpHeaderService {
	constructor(private readonly netlifyIdentity: NetlifyIdentityService) {}

	public transformRequest(request: HttpRequest<any>): HttpRequest<any> {
		if (this.isApiUrl(request.url)) {
			return request.clone({
				setHeaders: { ...this.createAuthHeaders() },
			});
		}

		return request;
	}

	private createAuthHeaders(): { Authorization: string } | {} {
		let token: Token;

		this.netlifyIdentity
			.getToken()
			.pipe(take(1))
			.subscribe((t) => (token = t));

		const { access_token: accessToken, token_type: tokenType } = token;

		if (accessToken) {
			return {
				Authorization: `${tokenType || 'Bearer'} ${accessToken}`,
			};
		}

		return {};
	}

	private isApiUrl(url: string): boolean {
		return url.includes('api');
	}
}
