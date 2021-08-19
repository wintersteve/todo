import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material/material.module';
import { ComponentsModule } from '../components/components.module';

const components = [MainComponent, LoginComponent];

@NgModule({
	declarations: [...components],
	exports: [...components],
	imports: [CommonModule, ComponentsModule, MaterialModule],
})
export class PagesModule {}
