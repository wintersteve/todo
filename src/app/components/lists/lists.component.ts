import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
} from '@angular/core';
import { List } from 'src/app/shared/services/fauna.service';

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

	public newListTitle = '';
	public clickedAddBtn = false;

	constructor(private cdRef: ChangeDetectorRef) {}

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
			// this.listsService.create(this.newListTitle);
			// this.resetNewList();
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
