import { List } from 'src/app/shared/models/lists';

export interface Variables {
	[key: string]: Variables | string;
}

export interface FindListsData {
	findDefaultLists: {
		data: List[];
	};
	findListsByUser: {
		data: List[];
	};
}
