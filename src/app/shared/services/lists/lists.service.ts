import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Lists } from '../../models/lists';
import { EndpointService, Route } from '../endpoint/endpoint.service';
import { List } from '../fauna.service';

export const EMPTY_LIST: List = {
	id: '',
	title: '',
	icon: '',
	isCustom: false,
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

	private load(): void {
		this.http
			.post<Lists>(this.endpoint.get(Route.GET_LISTS), {})
			.subscribe((lists) => {
				this._lists$.next(lists);
				this._selectedList$.next(lists[0]);
			});
	}
}
