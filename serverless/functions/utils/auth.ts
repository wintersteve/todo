import { Event } from '@netlify/functions/src/function/event';
import fetch from 'node-fetch';

const ENDPOINT =
	'https://angular-jamstack-todo.netlify.app/.netlify/identity/user';

const getTokenFromRequest = (event: Event) => {
	const token = event.headers.authorization.split(' ')[1];

	if (typeof token !== 'string') {
		throw new Error(`Expected token to be a string. Received ${token}`);
	}

	return token;
};

const getUserId = async (token: string): Promise<string> => {
	const response = await fetch(ENDPOINT, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		method: 'GET',
	});

	if (response.status !== 200) {
		throw new Error('Invalid Credentials');
	}

	const { id } = await response.json();

	return id;
};

export { getUserId, getTokenFromRequest };
