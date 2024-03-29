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
	list?: List;
}

export type Todos = Todo[];

export interface TodosGroupedByList {
	[key: string]: Todo[];
}
