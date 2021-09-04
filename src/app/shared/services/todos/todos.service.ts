import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isToday, parseISO } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, skip, switchMap } from 'rxjs/operators';
import { List } from '../../models/lists';
import { Todo, Todos } from '../../models/todos';
import { EndpointService, Route } from '../endpoint/endpoint.service';
import { ListsService } from '../lists/lists.service';

export const EMPTY_TODO: Todo = {
	id: '',
	title: '',
	notes: '',
	listId: '',
	deadline: undefined,
	isUrgent: false,
	isDone: false,
	isNew: true,
};

@Injectable({
	providedIn: 'root',
})
export class TodosService {
	private readonly _todos$ = new BehaviorSubject<Todos>(undefined);
	private readonly _selectedTodo$ = new BehaviorSubject<Todo>(undefined);

	public readonly filteredTodos$ = this.listsService.getSelected().pipe(
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
		private readonly listsService: ListsService
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

	public updateTodo(todo: Todo): Observable<Todo> {
		return this.http.post<Todo>(this.endpoint.get(Route.UPDATE_TODO), {
			id: todo.id,
			input: todo,
		});
	}

	private load(): void {
		this.http
			.post<Todos>(this.endpoint.get(Route.GET_TODOS), {})
			.subscribe((lists) => {
				this._todos$.next(lists);
			});
	}

	private findByList(selectedList: List, todos: Todo[]): Todo[] {
		switch (selectedList.title) {
			case 'Inbox':
				return todos;
			case 'Today':
				return todos.filter((todo) => isToday(parseISO(todo.deadline)));
			case 'Urgent':
				return todos.filter((todo) => todo.isUrgent);
			case 'Done':
				return todos.filter((todo) => todo.isDone);
			default:
				return todos.filter((todo) => todo.listId === selectedList.id);
		}
	}
}
