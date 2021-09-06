import { Handler } from '@netlify/functions';
import { Variables } from './models';
import { getTokenFromRequest, getUserId } from './utils/auth';
import { client } from './utils/gql';

function sanitizeInput(input: any): Variables {
	const { id, userId, ...safe } = input;

	return safe;
}

const operation = 'createTodo';

const query = `
  mutation CreateTodo($input: TodoInput!) {
		${operation}(data: $input) {
			id: _id
			deadline
			isUrgent
			isDone
			notes
			title
			userId
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

	console.log(data);

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors),
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
