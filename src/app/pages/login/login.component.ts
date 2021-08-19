import { Component, Inject } from '@angular/core';
import { NetlifyIdentityService } from 'src/app/libs/netlify-identity/services/netlify-identity.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(
		private readonly netlifyIdentityService: NetlifyIdentityService
	) {}

	public onClick(): void {
		this.netlifyIdentityService.openModal();
	}
}
