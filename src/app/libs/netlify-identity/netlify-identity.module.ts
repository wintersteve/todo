import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NETLIFY_IDENTITY_TOKEN } from './netlify-identity.token';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: NETLIFY_IDENTITY_TOKEN,
			useValue: window.netlifyIdentity,
		},
	],
})
export class NetlifyIdentityModule {}
