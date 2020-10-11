import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { list } from '../shared/interfaces/list';
import { ListsService } from '../shared/service/lists.service';

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
	@Input() selectedList: list;
	@Output() selected = new EventEmitter();
	@Output() toggled = new EventEmitter();

	newListTitle: string = '';
	lists: list[] = [];
	clickedAddBtn: boolean = false;

	addList(): void {
		this.clickedAddBtn = true;
	}

	resetNewList(): void {
		this.clickedAddBtn = false;
		this.newListTitle = '';
	}

	createList(): void {
		this.listsService.create(this.newListTitle);
		this.resetNewList();
	}

	constructor(private listsService: ListsService) {}

	ngOnInit(): void {
		this.lists = this.listsService.all();
	}
}
