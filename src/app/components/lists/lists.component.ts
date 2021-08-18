import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
} from '@angular/core';
import { list } from '../../shared/interfaces/list';
import { ListsService } from '../../shared/service/lists.service';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
	@Input() selectedList: list;
	@Output() selected = new EventEmitter();
	@Output() toggled = new EventEmitter();
	@ViewChild('newList') newList: ElementRef;

	newListTitle: string = '';
	lists: list[] = [];
	clickedAddBtn: boolean = false;

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

	ngOnInit(): void {
		this.lists = this.listsService.all();
	}

	constructor(
		private listsService: ListsService,
		private cdRef: ChangeDetectorRef
	) {}
}
