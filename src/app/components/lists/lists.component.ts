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

	constructor(private cdRef: ChangeDetectorRef) {}

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
			// this.listsService.create(this.newListTitle);
		}

		// this.resetNewList();
	}

	private setFocus() {
		this.newList.nativeElement.focus();
	}

	private resetNewList(): void {
		this.clickedAddBtn = false;
		this.newListTitle = '';
	}
}
