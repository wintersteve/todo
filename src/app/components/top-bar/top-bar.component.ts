import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
	public readonly user$ = this.authService.getUser();

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {}

	public onClick(): void {
		this.authService.logout().then(() => this.router.navigate(['login']));
	}
}
