import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
} from '@angular/core';
import { FaunaService, List } from 'src/app/shared/services/fauna.service';
import { ListsService } from '../../shared/services/lists/lists.service';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
	@Input() lists: List[];
	@Input() selectedList: List;
	@Output() selected = new EventEmitter();
	@Output() toggled = new EventEmitter();
	@ViewChild('newList') newList: ElementRef;

	public readonly lists$ = this.faunaService.getLists();

	public newListTitle = '';
	public clickedAddBtn = false;

	constructor(
		private listsService: ListsService,
		private cdRef: ChangeDetectorRef,
		private readonly faunaService: FaunaService
	) {}

	addList(): void {
		this.clickedAddBtn = true;
		this.cdRef.detectChanges();
		this.setFocus();
	}

	resetNewList(): void {
		this.clickedAddBtn = false;
		this.newListTitle = '';
	}

	createList(): void {
		if (this.notEmpty) {
			this.listsService.create(this.newListTitle);
			this.resetNewList();
		}
		return;
	}

	get notEmpty() {
		if (this.newListTitle !== '') return true;
		return false;
	}

	setFocus() {
		this.newList.nativeElement.focus();
	}
}
