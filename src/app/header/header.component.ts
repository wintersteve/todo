import { Component, EventEmitter, Input, Output } from '@angular/core';
import { list } from '../shared/interfaces/list';
import { todo } from '../shared/interfaces/todo';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@Input() selectedList: list;
	@Input() todos: todo[];
	@Output() expanded = new EventEmitter();

	constructor() {}
}
