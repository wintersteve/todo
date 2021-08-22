import { Handler } from '@netlify/functions';
import { fragements } from './utils/fragments';
import { client } from './utils/gql';

const operation = 'findTodosByUser';

const query = `
  ${fragements.TodoFields.value}
  query FindTodosByUser($input: String!) {
    findTodosByUser(userId: $input) {
      data {
        ...${fragements.TodoFields.key}
      }
    }
  }
`;

const handler: Handler = async (event, context) => {
	const response = await client.send(query, JSON.parse(event.body));
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
