import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
import { ListsComponent } from './lists/lists.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TodoComponent } from './todos/todo/todo.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';

const components = [
	TodosComponent,
	ListsComponent,
	DetailsComponent,
	HeaderComponent,
	ProgressBarComponent,
	TodoComponent,
	BottomMenuComponent,
];

@NgModule({
	declarations: [...components],
	exports: [...components],
	imports: [CommonModule, MaterialModule, FormsModule],
})
export class ComponentsModule {}
