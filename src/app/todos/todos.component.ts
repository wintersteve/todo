import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
} from '@angular/core';
import { differenceInCalendarDays, format } from 'date-fns';
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
export class TodosComponent implements OnInit, OnChanges {
	@Input() todos: todo[];
	@Input() selectedTodo: todo;
	@Output() clicked = new EventEmitter();
	@Output() selected = new EventEmitter();
	@Output() added = new EventEmitter();

	todosByList = [];
	notes: Notes = { id: '', active: false };
	daysUntilCompletion: DaysUntilCompletion = { id: '', content: '' };

	groupBy = (items, key) =>
		items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [...(result[item[key]] || []), item],
			}),
			{}
		);

	loadTodos() {
		this.todosByList = this.groupBy(this.todos, 'list');
	}

	toggleNotes(id: string): void {
		if (this.notes.active && this.notes.id === id) this.hideNotes();
		else this.showNotes(id);
	}

	showNotes(id: string) {
		this.notes = { id, active: true };
	}

	hideNotes() {
		this.notes = { id: '', active: false };
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

	ngOnInit() {
		this.loadTodos();
	}

	ngOnChanges() {
		this.loadTodos();
		this.hideNotes();
	}

	constructor() {}
}
