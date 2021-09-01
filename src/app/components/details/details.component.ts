import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnDestroy,
} from '@angular/core';
import { List, Todo } from 'src/app/shared/services/fauna.service';
@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
	@Input() lists: List[];
	@Input() set todo(value: Todo) {
		this._todo = { ...value };
	}
	public get todo() {
		return this._todo;
	}

	@Output() cancelled = new EventEmitter();
	@Output() saved = new EventEmitter();

	private _todo: Todo;

	ngOnInit(): void {
		this.toggleOverlay();
	}

	ngOnDestroy() {
		this.toggleOverlay();
	}

	public updateDate(date: Date): void {
		this.todo = { ...this.todo, deadline: date.toISOString() };
	}

	private toggleOverlay(): void {
		const bodyClass = document.body.classList;
		if (bodyClass.contains('overlay')) bodyClass.remove('overlay');
		else bodyClass.add('overlay');
	}
}
