import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		canActivate: [AuthGuard],
		component: MainComponent,
	},
	{
		path: 'login',
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
