import { Handler } from '@netlify/functions';
import { Variables } from './models';
import { getTokenFromRequest, getUserId } from './utils/auth';
import { fragments } from './utils/fragments';
import { client } from './utils/gql';
import { sanitizeInput } from './utils/sanitize-input';

const operation = 'updateTodo';

const query = `
	${fragments.TodoFields.definition}
  mutation UpdateTodo($id: ID!, $input: TodoInput!) {
		${operation}(id: $id, data: $input) {
			...${fragments.TodoFields.key}
		}
	}
`;

const handler: Handler = async (event) => {
	const { id, input } = JSON.parse(event.body) as Variables;

	const userId = await getUserId(getTokenFromRequest(event));

	const response = await client.send(query, {
		id,
		input: sanitizeInput(input),
	});

	const body = await response.json();

	const { data, errors } = body;

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors),
		};
	}

	if (!data[operation]) {
		return {
			statusCode: 404,
			body: 'Todo does not exist',
		};
	}

	if (data[operation].userId !== userId) {
		return {
			statusCode: 401,
			body: 'User is unauthorized',
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify(data[operation]),
	};
};

export { handler };
