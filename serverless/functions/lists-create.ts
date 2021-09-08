import { Handler } from '@netlify/functions';
import { Variables } from './models';
import { getTokenFromRequest, getUserId } from './utils/auth';
import { fragments } from './utils/fragments';
import { client } from './utils/gql';
import { sanitizeInput } from './utils/sanitize-input';

const operation = 'createList';

const query = `
	${fragments.ListFields.definition}
  mutation CreateList($input: ListInput!) {
		${operation}(data: $input) {
			...${fragments.ListFields.key}
		}
	}
`;

const handler: Handler = async (event) => {
	const { input } = JSON.parse(event.body) as Variables;

	const userId = await getUserId(getTokenFromRequest(event));

	const response = await client.send(query, {
		input: { ...sanitizeInput(input), userId },
	});

	const body = await response.json();

	const { data, errors } = body;

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify(data[operation]),
	};
};

export { handler };
