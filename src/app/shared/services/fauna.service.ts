import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	filter,
	first,
	map,
	share,
	shareReplay,
	switchMap,
	take,
	tap,
} from 'rxjs/operators';
import { NetlifyIdentityService } from 'src/app/libs/netlify-identity/services/netlify-identity.service';

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
	private readonly user$ = this.netlifyIdentity
		.getUser()
		.pipe(filter((user) => !!user));

	private readonly _lists$ = this.user$.pipe(
		first(),
		map((user) => user.token.access_token),
		switchMap((token) =>
			this.http.post<List[]>('/api/lists-get', {
				token,
			})
		),
		shareReplay(1)
	);

	private readonly _todos$ = this.user$.pipe(
		first(),
		map((user) => user.token.access_token),
		switchMap((token) =>
			this.http.post<Todo[]>('/api/todos-get', {
				token,
			})
		),
		shareReplay(1)
	);

	constructor(
		private readonly http: HttpClient,
		private readonly netlifyIdentity: NetlifyIdentityService
	) {}

	public getTodos(): Observable<Todo[]> {
		return this._todos$;
	}

	public getLists(): Observable<List[]> {
		return this._lists$;
	}
}
