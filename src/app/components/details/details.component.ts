import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	OnDestroy,
} from '@angular/core';
import { list } from '../../shared/interfaces/list';
import { todo } from '../../shared/interfaces/todo';
import { ListsService } from '../../shared/service/lists.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnChanges, OnDestroy {
	@Input() todo: todo;
	@Output() cancelled = new EventEmitter();
	@Output() saved = new EventEmitter();

	selectedTodo: todo | null = null;
	lists: list[] = [];

	get customLists() {
		return this.lists.filter((list) => list.custom);
	}

	get today() {
		return new Date();
	}

	copyTodo() {
		this.selectedTodo = { ...this.todo };
	}

	toggleOverlay() {
		const bodyClass = document.body.classList;
		if (bodyClass.contains('overlay')) bodyClass.remove('overlay');
		else bodyClass.add('overlay');
	}

	constructor(private listsService: ListsService) {}

	ngOnInit(): void {
		this.lists = this.listsService.all();
		this.copyTodo();
		this.toggleOverlay();
	}

	ngOnChanges() {
		this.copyTodo();
	}

	ngOnDestroy() {
		this.toggleOverlay();
	}
}
