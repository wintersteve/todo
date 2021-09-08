import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
} from '@angular/core';
import { List, Lists } from 'src/app/shared/models/lists';
import { ListsService } from 'src/app/shared/services/lists/lists.service';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
	@Input() lists: Lists;
	@Input() selectedList: List;
	@Output() selected = new EventEmitter();
	@Output() toggled = new EventEmitter();
	@ViewChild('newList') newList: ElementRef;

	public newListTitle = '';
	public clickedAddBtn = false;

	constructor(
		private readonly cdRef: ChangeDetectorRef,
		private readonly listsService: ListsService
	) {}

	public get isEmpty() {
		if (this.newListTitle === '') return true;
		return false;
	}

	public addList(): void {
		this.clickedAddBtn = true;
		this.cdRef.detectChanges();
		this.setFocus();
	}

	public createList(): void {
		if (!this.isEmpty) {
			this.listsService.createList(this.newListTitle);
		}

		this.resetNewList();
	}

	private setFocus() {
		this.newList.nativeElement.focus();
	}

	private resetNewList(): void {
		this.clickedAddBtn = false;
		this.newListTitle = '';
	}
}
