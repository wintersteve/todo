import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

const ENDPOINT = 'https://graphql.eu.fauna.com/graphql';

const send = async (query: string, variables?: string) => {
	return await fetch(ENDPOINT, {
		body: JSON.stringify({ query, variables }),
		headers: {
			Authorization: `Bearer ${process.env.FAUNA_DB}`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
};

export const client = { send };
