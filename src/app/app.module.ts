import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { TodosComponent } from './todos/todos.component';
import { ListsService } from './shared/service/lists.service';
import { ListsComponent } from './lists/lists.component';
import { DetailsComponent } from './details/details.component';
import { TodosService } from './shared/service/todos.service';
import { HeaderComponent } from './header/header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
	declarations: [
		AppComponent,
		TodosComponent,
		ListsComponent,
		DetailsComponent,
		HeaderComponent,
		ProgressBarComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
	],
	providers: [ListsService, TodosService],
	bootstrap: [AppComponent],
})
export class AppModule {}
