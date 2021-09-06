import { Component, EventEmitter, Input, Output } from '@angular/core';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import startOfTomorrow from 'date-fns/startOfTomorrow';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from 'src/app/shared/models/lists';
import { Todo } from 'src/app/shared/models/todos';
@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
	@Input() isActive: boolean;
	@Input() todo: Todo;
	@Input() list: List;
	@Input() activeNote: any;
	@Output() activeNoteChange = new EventEmitter();
	@Output() selected = new EventEmitter();
	@Output() clicked = new EventEmitter();
	@Output() selectedNote = new EventEmitter();

	public toggleNote(id: string): void {
		if (this.activeNote === id) this.hideNote();
		else this.showNote(id);
	}

	public get daysUntilDeadline$() {
		const { deadline } = this.todo;

		if (!deadline) {
			return of('');
		}

		return of(deadline).pipe(
			map((deadline) => parseISO(deadline)),
			map((deadline) => [
				differenceInCalendarDays(deadline, startOfTomorrow()),
				deadline,
			]),
			map(([delta, deadline]) =>
				this.getTooltipContent(format(deadline, 'dd.MM.yyyy'), delta as number)
			)
		);
	}

	public updateCheckbox() {
		return this.clicked.emit({ ...this.todo, isDone: !this.todo.isDone });
	}

	private showNote(id: string) {
		this.activeNoteChange.emit(id);
	}

	private hideNote() {
		this.activeNoteChange.emit('');
	}

	private getTooltipContent(formatted: string, daysLeft: number): string {
		let content = '';
		content += `To do until ${formatted} `;
		if (daysLeft === 0) content += '(Today).';
		else if (daysLeft === 1) content += '(1 day left).';
		else if (daysLeft > 1) content += `(${daysLeft} day left).`;
		return content;
	}
}
