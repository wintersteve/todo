import { Handler } from '@netlify/functions';
import { fragements } from './utils/fragments';
import { client } from './utils/gql';
import { getTokenFromRequest, getUserId } from './utils/auth';

interface List {
	icon: string;
	id: string;
	isCustom: boolean;
	title: string;
}

interface FindListsData {
	findDefaultLists: {
		data: List[];
	};
	findListsByUser: {
		data: List[];
	};
}

const query = `
  ${fragements.ListFields.value}
  query FindLists($input: String!) {
    findDefaultLists(isCustom: false) {
      data {
        ...${fragements.ListFields.key}
      }
    }
    findListsByUser(userId: $input) {
      data {
        ...${fragements.ListFields.key}
      }
    }
  }
`;

const handler: Handler = async (event) => {
	const id = await getUserId(getTokenFromRequest(event));

	const response = await client.send(query, { input: id });
	const body = await response.json();

	if (body.errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(body.errors),
		};
	}

	const data: FindListsData = body.data;

	return {
		statusCode: 200,
		body: JSON.stringify([
			...data.findDefaultLists.data,
			...data.findListsByUser.data,
		]),
	};
};

export { handler };
