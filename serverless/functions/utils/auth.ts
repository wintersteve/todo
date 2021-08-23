import fetch from 'node-fetch';

const ENDPOINT =
	'https://angular-jamstack-todo.netlify.app/.netlify/identity/user';

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

export { getUserId };
