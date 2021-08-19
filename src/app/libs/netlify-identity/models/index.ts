declare global {
	interface Window {
		netlifyIdentity: NetlifyIdentity;
	}
}

interface NetlifyIdentity {
	currentUser: () => User;
	logout: () => Promise<null>;
	open: () => void;
}

interface Token {
	access_token: string;
	token_type: 'bearer';
	expires_in: number;
	refresh_token: string;
	expires_at: number;
}

interface User {
	app_metadata: { provider: string };
	aud: string;
	confirmation_sent_at: string;
	confirmed_at: string;
	created_at: string;
	email: string;
	id: string;
	recovery_sent_at: string;
	role: string;
	token: Token;
	updated_at: string;
	url: string;
	user_metadata: { full_name: string };
}

export { NetlifyIdentity, Token, User };
