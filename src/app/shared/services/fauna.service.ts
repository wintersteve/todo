import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { EndpointService, Route } from './endpoint/endpoint.service';

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

export interface List {
	icon: string;
	id: string;
	isCustom: boolean;
	title: string;
}

@Injectable({
	providedIn: 'root',
})
export class FaunaService {
	private readonly _lists$ = this.http
		.post<List[]>(this.endpoint.get(Route.GET_LISTS), {})
		.pipe(shareReplay());

	private readonly _todos$ = this.http
		.post<Todo[]>(this.endpoint.get(Route.GET_TODOS), {})
		.pipe(shareReplay());

	constructor(
		private readonly endpoint: EndpointService,
		private readonly http: HttpClient
	) {}

	public getTodos(): Observable<Todo[]> {
		return this._todos$;
	}

	public getLists(): Observable<List[]> {
		return this._lists$;
	}

	public updateTodo(todo: Todo): Observable<Todo> {
		return this.http.post<Todo>(this.endpoint.get(Route.UPDATE_TODO), {
			id: todo.id,
			input: todo,
		});
	}
}
