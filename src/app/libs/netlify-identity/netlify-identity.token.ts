import { InjectionToken } from '@angular/core';
import { NetlifyIdentity } from './models';

export const NETLIFY_IDENTITY_TOKEN = new InjectionToken<NetlifyIdentity>(
	'NETLIFY_IDENTITY'
);
