import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import { TodosGroupedByList } from 'src/app/pages/main/main.component';
import { Todo } from 'src/app/shared/services/fauna.service';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnChanges {
	@Input() selectedTodo: Todo;
	@Input() todos: TodosGroupedByList;
	@Output() clicked = new EventEmitter();
	@Output() selected = new EventEmitter();
	@Output() added = new EventEmitter();

	public activeNote = '';

	public ngOnChanges(): void {
		this.hideNote();
	}

	public get hasTodos(): boolean {
		return this.todos && !!Object.keys(this.todos)?.length;
	}

	private hideNote(): void {
		this.activeNote = '';
	}
}
