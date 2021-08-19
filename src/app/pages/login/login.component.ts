import { Component, Inject } from '@angular/core';
import { WINDOW_TOKEN } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(@Inject(WINDOW_TOKEN) private readonly window: Window) {}

	public onClick(): void {
		this.window.netlifyIdentity.open();
	}
}
