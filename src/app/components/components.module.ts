import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
import { ListsComponent } from './lists/lists.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TodoComponent } from './todos/todo/todo.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { MaterialModule } from '../libs/material/material.module';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';

const components = [
	TodosComponent,
	ListsComponent,
	DetailsComponent,
	HeaderComponent,
	ProgressBarComponent,
	TodoComponent,
	TopBarComponent,
	BottomMenuComponent,
];

@NgModule({
	declarations: [...components],
	exports: [...components],
	imports: [CommonModule, MaterialModule, FormsModule],
})
export class ComponentsModule {}
