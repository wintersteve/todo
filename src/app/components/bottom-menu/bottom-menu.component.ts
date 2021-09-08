import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-bottom-menu',
	templateUrl: './bottom-menu.component.html',
	styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
	@Output() toggled = new EventEmitter<void>();
}
