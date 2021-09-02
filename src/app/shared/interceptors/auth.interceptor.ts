import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttpHeaderService } from '../services/auth-http-header/auth-http-header.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
	constructor(private readonly authHttpHeaderService: AuthHttpHeaderService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const transformedRequest =
			this.authHttpHeaderService.transformRequest(request);

		return next.handle(transformedRequest);
	}
}
