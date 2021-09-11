import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListsAdapter } from 'src/app/shared/adapters/lists.adapter';
import { EMPTY_LIST } from 'src/app/shared/constants/lists';
import { DEFAULT_LIST, List, Lists } from 'src/app/shared/models/lists';
import { v4 as uuidv4 } from 'uuid';

export const lists: Lists = [
	{ id: DEFAULT_LIST.INBOX, title: 'Inbox', icon: 'inbox', isCustom: false },
	{ id: DEFAULT_LIST.TODAY, title: 'Today', icon: 'today', isCustom: false },
	{ id: DEFAULT_LIST.URGENT, title: 'Urgent', icon: 'flag', isCustom: false },
	{
		id: DEFAULT_LIST.DONE,
		title: 'Done',
		icon: 'check_circle',
		isCustom: false,
	},
	{ id: uuidv4(), title: 'List 1', icon: 'layers', isCustom: true },
	{ id: uuidv4(), title: 'List 2', icon: 'layers', isCustom: true },
	{ id: uuidv4(), title: 'List 3', icon: 'layers', isCustom: true },
];

@Injectable({
	providedIn: 'root',
})
export class ListsService implements ListsAdapter {
	private readonly _lists$ = new BehaviorSubject<Lists>(undefined);
	private readonly _selectedList$ = new BehaviorSubject<List>(undefined);

	constructor() {
		this.load();
	}

	public getLists(): Observable<Lists> {
		return this._lists$.pipe();
	}

	public getSelected(): Observable<List> {
		return this._selectedList$.pipe();
	}

	public setSelected(list: List): void {
		this._selectedList$.next(list);
	}

	public createList(title: string): void {
		const input = { ...EMPTY_LIST, title };

		const previousState = this._lists$.value;
		const updatedState = [...previousState, input];

		this._lists$.next(updatedState);
	}

	public updateList(list: List): void {
		const previousState = this._lists$.value;
		const updatedState = previousState.map((listInState) =>
			listInState.id === list.id ? list : listInState
		);

		this._lists$.next(updatedState);
	}

	public load(): void {
		this._lists$.next(lists);
		this._selectedList$.next(lists[0]);
	}
}
