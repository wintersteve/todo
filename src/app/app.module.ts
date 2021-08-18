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
import { TodoComponent } from './todos/todo/todo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { STORAGE_TOKEN } from './shared/service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		TodosComponent,
		ListsComponent,
		DetailsComponent,
		HeaderComponent,
		ProgressBarComponent,
		TodoComponent,
		BottomMenuComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
		FormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
	],
	providers: [
		ListsService,
		TodosService,
		{ provide: STORAGE_TOKEN, useValue: window.localStorage },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
