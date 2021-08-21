import { Handler } from '@netlify/functions';
import { client } from './utils/gql';

const query = `
  query GetTodos {
    getTodos {
      data {
        _id
        deadline
        isUrgent
        isDone
        notes
        title
        user
      }
    }
  }
`;

const handler: Handler = async () => {
	const response = await client.send(query);
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
		body: JSON.stringify(data),
	};
};

export { handler };
