import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { NetlifyIdentityModule } from './libs/netlify-identity/netlify-identity.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { DemoModule } from './libs/demo/demo.module';
import { LISTS_SERVICE, TODOS_SERVICE } from './shared/constants/tokens';
import { ListsService } from './shared/services/lists/lists.service';
import { TodosService } from './shared/services/todos/todos.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		NetlifyIdentityModule,
		PagesModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
		DemoModule,
	],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: LISTS_SERVICE,
			useClass: ListsService,
		},
		{
			provide: TODOS_SERVICE,
			useClass: TodosService,
		},
	],
})
export class AppModule {}
