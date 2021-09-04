import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List } from 'src/app/shared/models/lists';
import { Todos } from 'src/app/shared/models/todos';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@Input() selectedList: List;
	@Input() todos: Todos;
	@Output() expanded = new EventEmitter();
}
