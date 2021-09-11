import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
} from '@angular/core';
import { ListsAdapter } from 'src/app/shared/adapters/lists.adapter';
import { List, Lists } from 'src/app/shared/models/lists';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
	@Input() lists: Lists;
	@Input() selectedList: List;

	@Output() added = new EventEmitter<string>();
	@Output() updated = new EventEmitter<List>();
	@Output() selected = new EventEmitter();

	@ViewChild('newList') newList: ElementRef;
	@ViewChild('listToEdit') listToEdit: ElementRef;

	public newListTitle = '';
	public clickedAddBtn = false;
	public listInEditMode: string;

	constructor(private readonly cdRef: ChangeDetectorRef) {}

	public addList(): void {
		this.clickedAddBtn = true;
		this.cdRef.detectChanges();
		this.newList.nativeElement.focus();
	}

	public editList(event: MouseEvent, id: string): void {
		event.stopPropagation();

		this.listInEditMode = id;
		this.cdRef.detectChanges();
		this.listToEdit.nativeElement.focus();
	}

	public createList(): void {
		if (!this.isEmpty) {
			this.added.emit(this.newListTitle);
		}

		this.resetNewList();
	}

	public updateList(list: List): void {
		this.updated.emit(list);

		this.resetNewList();
	}

	private resetNewList(): void {
		this.clickedAddBtn = false;
		this.newListTitle = '';
		this.listInEditMode = '';
	}

	private get isEmpty() {
		if (this.newListTitle === '') return true;
		return false;
	}
}
