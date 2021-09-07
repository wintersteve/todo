import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnDestroy,
} from '@angular/core';
import { Lists } from 'src/app/shared/models/lists';
import { Todo } from 'src/app/shared/models/todos';
@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
	@Input() lists: Lists;
	@Input() set todo(value: Todo) {
		this._todo = { ...value };
	}
	public get todo() {
		return this._todo;
	}

	@Output() cancelled = new EventEmitter();
	@Output() saved = new EventEmitter();

	private _todo: Todo;

	public ngOnInit(): void {
		this.toggleOverlay();
	}

	public ngOnDestroy() {
		this.toggleOverlay();
	}

	public updateDate(date: Date): void {
		this.todo = { ...this.todo, deadline: date.toISOString() };
	}

	public isSelected(selected: any, prev: any): boolean {
		return selected.id === prev.id;
	}

	private toggleOverlay(): void {
		const bodyClass = document.body.classList;
		if (bodyClass.contains('overlay')) bodyClass.remove('overlay');
		else bodyClass.add('overlay');
	}
}
