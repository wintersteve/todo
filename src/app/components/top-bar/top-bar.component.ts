import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
	public readonly user$ = this.authService.getUser();

	constructor(private readonly authService: AuthService) {}

	public onClick(): void {
		this.authService.logout();
	}
}
