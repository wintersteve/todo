import { List } from '../lists';

export interface Todo {
	id: string;
	deadline?: string;
	isUrgent?: boolean;
	isDone: boolean;
	isNew?: boolean;
	notes?: string;
	title: string;
	userId?: string;
	listId?: string;
}

export interface TodosGroupedByList {
	[key: string]: {
		list: List;
		todos: Todo[];
	};
}
