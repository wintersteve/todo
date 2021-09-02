import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

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
		.post<List[]>('/api/lists-get', {})
		.pipe(shareReplay());

	private readonly _todos$ = this.http
		.post<Todo[]>('/api/todos-get', {})
		.pipe(shareReplay());

	constructor(private readonly http: HttpClient) {}

	public getTodos(): Observable<Todo[]> {
		return this._todos$;
	}

	public getLists(): Observable<List[]> {
		return this._lists$;
	}
}
