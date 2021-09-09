import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { List, Lists } from '../../models/lists';
import { EndpointService, Route } from '../endpoint/endpoint.service';

export const EMPTY_LIST: List = {
	id: '',
	title: '',
	icon: 'layers',
	isCustom: true,
};

@Injectable({
	providedIn: 'root',
})
export class ListsService {
	private readonly _lists$ = new BehaviorSubject<Lists>(undefined);
	private readonly _selectedList$ = new BehaviorSubject<List>(undefined);

	constructor(
		private readonly endpoint: EndpointService,
		private readonly http: HttpClient
	) {
		this.load();
	}

	public getLists(): Observable<Lists> {
		return this._lists$.pipe(skip(1));
	}

	public getSelected(): Observable<List> {
		return this._selectedList$.pipe(skip(1));
	}

	public setSelected(list: List): void {
		this._selectedList$.next(list);
	}

	public createList(title: string): void {
		const input = { ...EMPTY_LIST, title };

		const previousState = this._lists$.value;
		const updatedState = [...previousState, input];

		this._lists$.next(updatedState);

		this.http
			.post<List>(this.endpoint.get(Route.CREATE_LIST), {
				input,
			})
			.subscribe((list) => {
				this._lists$.next([...previousState, list]);
			});
	}

	public updateList(list: List): void {
		const previousState = this._lists$.value;
		const updatedState = previousState.map((listInState) =>
			listInState.id === list.id ? list : listInState
		);

		this._lists$.next(updatedState);

		this.http
			.post<List>(this.endpoint.get(Route.UPDATE_LIST), {
				id: list.id,
				input: list,
			})
			.subscribe();
	}

	private load(): void {
		this.http
			.post<Lists>(this.endpoint.get(Route.GET_LISTS), {})
			.subscribe((lists) => {
				this._lists$.next(lists);
				this._selectedList$.next(lists[0]);
			});
	}
}
