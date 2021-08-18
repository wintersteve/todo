import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { ListsService } from './shared/service/lists.service';
import { TodosService } from './shared/service/todos.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { STORAGE_TOKEN } from './shared/service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		ComponentsModule,
		HttpClientModule,
		MaterialModule,
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
