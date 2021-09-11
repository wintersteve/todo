import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	DEMO_LISTS_SERVICE,
	DEMO_TODOS_SERVICE,
} from './libs/demo/constants/tokens';
import { AuthGuard } from './libs/netlify-identity/guards/auth.guard';
import { NotAuthGuard } from './libs/netlify-identity/guards/not-auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { LISTS_SERVICE, TODOS_SERVICE } from './shared/constants/tokens';

const routes: Routes = [
	{
		path: 'demo',
		component: MainComponent,
		data: {
			listsService: DEMO_LISTS_SERVICE,
			todosService: DEMO_TODOS_SERVICE,
		},
	},
	{
		path: '',
		canActivate: [AuthGuard],
		component: MainComponent,
		data: {
			listsService: LISTS_SERVICE,
			todosService: TODOS_SERVICE,
		},
	},
	{
		path: 'login',
		canActivate: [NotAuthGuard],
		component: LoginComponent,
	},
	{
		path: '**',
		redirectTo: '/',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
