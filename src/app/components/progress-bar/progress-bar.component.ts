import { Component, Input } from '@angular/core';
import { Todos } from 'src/app/shared/models/todos';

@Component({
	selector: 'app-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
	@Input() todos: Todos;

	get percentDone() {
		const amountDone = this.todos.reduce(
			(result, todo) => (result += todo.isDone ? 1 : 0),
			0
		);
		if (this.todos.length > 0) return (amountDone / this.todos.length) * 100;
		else return 0;
	}
	constructor() {}
}
