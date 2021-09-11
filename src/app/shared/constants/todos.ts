import { Todo } from '../models/todos';
import { EMPTY_LIST } from './lists';

export const EMPTY_TODO: Todo = {
	id: undefined,
	title: '',
	notes: '',
	list: EMPTY_LIST,
	deadline: '',
	isUrgent: false,
	isDone: false,
	isNew: true,
};
