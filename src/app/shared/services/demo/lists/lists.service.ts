import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { list } from '../../../interfaces/list';

@Injectable({
	providedIn: 'root',
})
export class ListsService {
	emptyList: list = {
		id: '',
		title: '',
		icon: '',
		custom: false,
	};

	lists: list[] = [
		{ id: uuidv4(), title: 'Inbox', icon: 'inbox', custom: false },
		{ id: uuidv4(), title: 'Today', icon: 'today', custom: false },
		{ id: uuidv4(), title: 'Urgent', icon: 'flag', custom: false },
		{ id: uuidv4(), title: 'Done', icon: 'check_circle', custom: false },
		{ id: uuidv4(), title: 'List 1', icon: 'layers', custom: true },
		{ id: uuidv4(), title: 'List 2', icon: 'layers', custom: true },
		{ id: uuidv4(), title: 'List 3', icon: 'layers', custom: true },
	];

	all(): list[] {
		return this.lists;
	}

	find(id: string): list {
		return this.lists.find((item) => item.id === id)!;
	}

	create(title: string): void {
		this.lists.push({
			id: uuidv4(),
			title,
			icon: 'layers',
			custom: true,
		});
	}
}
