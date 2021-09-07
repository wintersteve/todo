import { Handler } from '@netlify/functions';
import { fragments } from './utils/fragments';
import { client } from './utils/gql';
import { getTokenFromRequest, getUserId } from './utils/auth';

const operation = 'findTodosByUser';

const query = `
  ${fragments.TodoFields.definition}
  query FindTodosByUser($input: String!) {
    findTodosByUser(userId: $input) {
      data {
        ...${fragments.TodoFields.key}
      }
    }
  }
`;

const handler: Handler = async (event) => {
	const id = await getUserId(getTokenFromRequest(event));

	const response = await client.send(query, { input: id });
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
		body: JSON.stringify(data[operation].data),
	};
};

export { handler };
