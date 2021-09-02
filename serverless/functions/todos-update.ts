import { Handler } from '@netlify/functions';
import { Todo } from 'src/app/shared/services/fauna.service';
import { Variables } from './models';
import { getTokenFromRequest, getUserId } from './utils/auth';
import { client } from './utils/gql';

function sanitizeInput(input: any): Variables {
	const { id, userId, ...safe } = input;

	return safe;
}

const operation = 'updateTodo';

const query = `
  mutation UpdateTodo($id: ID!, $input: TodoInput!) {
		${operation}(id: $id, data: $input) {
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
