import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NetlifyIdentityService } from 'src/app/libs/netlify-identity/services/netlify-identity.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(
		private readonly netlifyIdentityService: NetlifyIdentityService,
		private readonly router: Router
	) {}

	public onClick(): void {
		this.netlifyIdentityService.openModal();
	}

	public onDemo(): void {
		this.router.navigateByUrl('/#demo');
	}
}
