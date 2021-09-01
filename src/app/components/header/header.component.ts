import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List, Todo } from 'src/app/shared/services/fauna.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@Input() selectedList: List;
	@Input() todos: Todo[];
	@Output() expanded = new EventEmitter();
}
