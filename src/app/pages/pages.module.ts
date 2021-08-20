import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../libs/material/material.module';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

const components = [MainComponent, LoginComponent];

@NgModule({
	declarations: [...components],
	exports: [...components],
	imports: [CommonModule, ComponentsModule, MaterialModule, RouterModule],
})
export class PagesModule {}
