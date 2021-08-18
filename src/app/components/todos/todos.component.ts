import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
} from '@angular/core';
import { todo } from '../../shared/interfaces/todo';

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
	activeNote: string = '';

	private hideNote() {
		this.activeNote = '';
	}

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

	ngOnInit() {
		this.loadTodos();
	}

	ngOnChanges() {
		this.loadTodos();
		this.hideNote();
	}

	constructor() {}
}
