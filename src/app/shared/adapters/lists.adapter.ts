import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { List, Lists } from '../models/lists';

@Injectable({
	providedIn: 'root',
})
export abstract class ListsAdapter {
	abstract getLists(): Observable<Lists>;

	abstract getSelected(): Observable<List>;

	abstract setSelected(list: List): void;

	abstract createList(title: string): void;

	abstract updateList(list: List): void;

	abstract load(): void;
}
