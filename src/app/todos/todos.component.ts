import { Component, EventEmitter, Input, Output } from '@angular/core';
import { differenceInCalendarDays, format } from 'date-fns';
import { list } from '../shared/interfaces/list';
import { todo } from '../shared/interfaces/todo';

interface Notes {
	id: string;
	active: boolean;
}

interface DaysUntilCompletion {
	id: string;
	content: string;
}

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
	@Input() todos: todo[];
	@Input() selectedTodo: todo;
	@Input() selectedList: list;
	@Output() expanded = new EventEmitter();
	@Output() clicked = new EventEmitter();
	@Output() selected = new EventEmitter();
	@Output() added = new EventEmitter();

	notes: Notes = { id: '', active: false };
	daysUntilCompletion: DaysUntilCompletion = { id: '', content: '' };

	showNotes(id: string): void {
		if (this.notes.active && this.notes.id === id) {
			this.notes = { id, active: false };
		} else {
			this.notes = { id, active: true };
		}
	}

	getDaysLeft(todo: todo): void {
		if (todo.id === this.daysUntilCompletion.id) return;
		const daysLeft = differenceInCalendarDays(todo.doneUntil, new Date());
		const formatted = format(todo.doneUntil, 'dd.MM.yyyy');
		const content = this.getTooltipContent(formatted, daysLeft);
		this.daysUntilCompletion = { id: todo.id, content };
	}

	getTooltipContent(formatted: string, daysLeft: number): string {
		let content = '';
		content += `To do until ${formatted} `;
		if (daysLeft === 0) content += '(Today).';
		else if (daysLeft === 1) content += '(1 day left).';
		else if (daysLeft > 1) content += `(${daysLeft} day left).`;
		return content;
	}

	constructor() {}
}
