import { NgModule } from '@angular/core';
import { DEMO_LISTS_SERVICE, DEMO_TODOS_SERVICE } from './constants/tokens';

import { ListsService } from './lists/lists.service';
import { TodosService } from './todos/todos.service';

@NgModule({
	providers: [
		{
			provide: DEMO_LISTS_SERVICE,
			useClass: ListsService,
		},
		{
			provide: DEMO_TODOS_SERVICE,
			useClass: TodosService,
		},
	],
})
export class DemoModule {}
