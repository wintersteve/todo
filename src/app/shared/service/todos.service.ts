import { Injectable } from '@angular/core';
import { todo } from '../interfaces/todo';
import { addDays, isToday } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
	providedIn: 'root',
})
export class TodosService {
	emptyTodo: todo = {
		id: '',
		title: '',
		notes: '',
		list: '',
		doneUntil: undefined,
		urgent: false,
		done: false,
	};

	todos: todo[] = [
		{
			id: uuidv4(),
			title: 'Add SSR',
			notes:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
			list: 'List 1',
			doneUntil: undefined,
			urgent: true,
			done: false,
		},
		{
			id: uuidv4(),
			title: 'Add Service Workers',
			notes: '',
			list: 'List 2',
			doneUntil: undefined,
			urgent: false,
			done: true,
		},
		{
			id: uuidv4(),
			title: 'This is a todo',
			notes:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
			list: 'List 1',
			doneUntil: addDays(new Date(), 5),
			urgent: false,
			done: false,
		},
		{
			id: uuidv4(),
			title: 'This is another todo',
			notes:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
			list: 'List 2',
			doneUntil: addDays(new Date(), 2),
			urgent: false,
			done: true,
		},
		{
			id: uuidv4(),
			title: 'This is a todo',
			notes:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
			list: 'List 1',
			doneUntil: undefined,
			urgent: false,
			done: false,
		},
		{
			id: uuidv4(),
			title: 'This is another todo',
			notes: '',
			list: 'List 2',
			doneUntil: addDays(new Date(), 1),
			urgent: false,
			done: true,
		},
	];

	all(): todo[] {
		return this.todos;
	}

	find(id: string): todo {
		return this.todos.find((todo) => todo.id === id)!;
	}

	create(todo: todo): void {
		this.todos.unshift({ ...todo, id: uuidv4() });
	}

	update(todo: todo): void {
		const index = this.todos.findIndex((t) => t.id === todo.id);
		this.todos[index] = todo;
	}

	sort(): todo[] {
		return this.todos.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
	}

	findByList(list: string): todo[] {
		switch (list) {
			case 'Inbox':
				return this.all();
				break;
			case 'Today':
				return this.todos.filter((todo) => isToday(todo.doneUntil));
				break;
			case 'Urgent':
				return this.todos.filter((todo) => todo.urgent);
				break;
			case 'Pending':
				return this.todos.filter((todo) => !todo.done);
				break;
			case 'Done':
				return this.todos.filter((todo) => todo.done);
				break;
			default:
				return this.todos.filter((todo) => todo.list === list);
		}
	}

	constructor() {}
}
