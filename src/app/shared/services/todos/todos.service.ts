import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { isToday, parseISO } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, skip, switchMap, tap } from 'rxjs/operators';
import { TodosAdapter } from '../../adapters/todos.adapter';
import { LISTS_SERVICE } from '../../constants/tokens';
import { DEFAULT_LIST, List } from '../../models/lists';
import { Todo, Todos } from '../../models/todos';
import { EndpointService, Route } from '../endpoint/endpoint.service';
import { ListsService } from '../lists/lists.service';

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

	constructor(
		private readonly endpoint: EndpointService,
		private readonly http: HttpClient,
		@Inject(LISTS_SERVICE) private readonly listsAdapter: ListsService
	) {
		this.load();
	}

	public getTodos(): Observable<Todos> {
		return this._todos$.asObservable();
	}

	public getSelected(): Observable<Todo> {
		return this._selectedTodo$.pipe(skip(1));
	}

	public setSelected(todo: Todo): void {
		this._selectedTodo$.next(todo);
	}

	public createTodo(todo: Todo): void {
		const previousState = this._todos$.value;
		const updatedState = [...previousState, { ...todo, id: undefined }];

		this._todos$.next(updatedState);

		this.http
			.post<Todo>(this.endpoint.get(Route.CREATE_TODO), {
				input: { ...todo, list: { connect: todo.list.id } },
			})
			.subscribe((todo) => {
				this._todos$.next([...previousState, todo]);
			});
	}

	public updateTodo(todo: Todo): void {
		const updatedState = this._todos$.value.map((todoInState) =>
			todoInState.id === todo.id ? todo : todoInState
		);

		this._todos$.next(updatedState);

		this.http
			.post<Todo>(this.endpoint.get(Route.UPDATE_TODO), {
				id: todo.id,
				input: { ...todo, list: { connect: todo.list.id } },
			})
			.subscribe();
	}

	public load(): void {
		this.http
			.post<Todos>(this.endpoint.get(Route.GET_TODOS), {})
			.subscribe((lists) => {
				this._todos$.next(lists);
			});
	}

	public findByList(selectedList: List, todos: Todo[]): Todo[] {
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
