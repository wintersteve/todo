import { Injectable } from '@angular/core';
import { isToday, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Todo, Todos } from 'src/app/shared/models/todos';
import { lists, ListsService } from '../lists/lists.service';
import { DEFAULT_LIST, List } from 'src/app/shared/models/lists';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, skip, switchMap } from 'rxjs/operators';
import { ListsAdapter } from 'src/app/shared/adapters/lists.adapter';
import { TodosAdapter } from 'src/app/shared/adapters/todos.adapter';

@Injectable({
	providedIn: 'root',
})
export class TodosService implements TodosAdapter {
	private readonly _todos$ = new BehaviorSubject<Todos>(undefined);
	private readonly _selectedTodo$ = new BehaviorSubject<Todo>(undefined);

	public readonly filteredTodos$ = this.listsAdapter.getSelected().pipe(
		filter((selectedList) => !!selectedList),
		switchMap((selectedList) =>
			this._todos$.pipe(
				filter((todos) => !!todos),
				map((todos) => this.findByList(selectedList, todos))
			)
		)
	);

	constructor(private readonly listsAdapter: ListsService) {
		this.load();
	}

	public getTodos(): Observable<Todos> {
		return this._todos$.asObservable();
	}

	public getSelected(): Observable<Todo> {
		return this._selectedTodo$.pipe();
	}

	public setSelected(todo: Todo): void {
		this._selectedTodo$.next(todo);
	}

	public createTodo(todo: Todo): void {
		const previousState = this._todos$.value;
		const updatedState = [...previousState, { ...todo, id: undefined }];

		this._todos$.next(updatedState);
	}

	public updateTodo(todo: Todo): void {
		const updatedState = this._todos$.value.map((todoInState) =>
			todoInState.id === todo.id ? todo : todoInState
		);

		this._todos$.next(updatedState);
	}

	public load(): void {
		this._todos$.next([
			{
				id: uuidv4(),
				title: 'Lorem Ipsum',
				notes:
					'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
				list: lists[4],
				deadline: undefined,
				isUrgent: true,
				isDone: false,
			},
			{
				id: uuidv4(),
				title: 'Dolor Sit',
				notes:
					'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
				list: lists[5],
				deadline: undefined,
				isUrgent: true,
				isDone: false,
			},
			{
				id: uuidv4(),
				title: 'Amet Consectetur',
				notes:
					'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
				list: lists[4],
				deadline: undefined,
				isUrgent: true,
				isDone: false,
			},
			{
				id: uuidv4(),
				title: 'Odit Mollitia',
				notes:
					'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
				list: lists[5],
				deadline: undefined,
				isUrgent: true,
				isDone: true,
			},
			{
				id: uuidv4(),
				title: 'Sint Reiciendis',
				notes:
					'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit mollitia odio molestias corrupti, a sint reiciendis natus vel voluptas deleniti possimus magnam vero eligendi quas blanditiis tempora, consequatur ullam assumenda!',
				list: lists[5],
				deadline: undefined,
				isUrgent: true,
				isDone: true,
			},
		]);
	}

	public findByList(selectedList: List, todos: Todo[]): Todos {
		switch (selectedList.id) {
			case DEFAULT_LIST.INBOX:
				return todos;
			case DEFAULT_LIST.TODAY:
				return todos.filter((todo) => isToday(parseISO(todo.deadline)));
			case DEFAULT_LIST.URGENT:
				return todos.filter((todo) => todo.isUrgent);
			case DEFAULT_LIST.DONE:
				return todos.filter((todo) => todo.isDone);
			default:
				return todos.filter((todo) => todo.list.id === selectedList.id);
		}
	}
}
