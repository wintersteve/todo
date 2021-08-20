import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NetlifyIdentityService } from 'src/app/libs/netlify-identity/services/netlify-identity.service';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
	public user$ = this.netlifyIdentity
		.getUser()
		.pipe(map((user) => user?.user_metadata));

	constructor(
		private readonly netlifyIdentity: NetlifyIdentityService,
		private readonly router: Router
	) {}

	public onClick(): void {
		this.netlifyIdentity.logout(() => this.router.navigate(['login']));
	}
}
