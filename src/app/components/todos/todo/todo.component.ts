import { Component, EventEmitter, Input, Output } from '@angular/core';
import { differenceInCalendarDays, format } from 'date-fns';

interface DaysUntilCompletion {
	id: string;
	content: string;
}

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
	@Input() todo: any;
	@Input() selectedTodo: any;
	@Input() list: any;
	@Input() activeNote: any;
	@Output() activeNoteChange = new EventEmitter();
	@Output() selected = new EventEmitter();
	@Output() clicked = new EventEmitter();
	@Output() selectedNote = new EventEmitter();

	public daysUntilCompletion: DaysUntilCompletion = { id: '', content: '' };

	public toggleNote(id: string): void {
		if (this.activeNote === id) this.hideNote();
		else this.showNote(id);
	}

	private showNote(id: string) {
		this.activeNoteChange.emit(id);
	}

	private hideNote() {
		this.activeNoteChange.emit('');
	}

	public getDaysLeft(todo: any): void {
		if (todo.id === this.daysUntilCompletion.id) return;
		const daysLeft = differenceInCalendarDays(todo.doneUntil, new Date());
		const formatted = format(todo.doneUntil, 'dd.MM.yyyy');
		const content = this.getTooltipContent(formatted, daysLeft);
		this.daysUntilCompletion = { id: todo.id, content };
	}

	private getTooltipContent(formatted: string, daysLeft: number): string {
		let content = '';
		content += `To do until ${formatted} `;
		if (daysLeft === 0) content += '(Today).';
		else if (daysLeft === 1) content += '(1 day left).';
		else if (daysLeft > 1) content += `(${daysLeft} day left).`;
		return content;
	}

	constructor() {}
}
