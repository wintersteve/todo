import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { groupBy } from 'src/app/shared/utils/group-by';
import { Todo, Todos, TodosGroupedByList } from 'src/app/shared/models/todos';
import { List, Lists } from 'src/app/shared/models/lists';
import { ListsAdapter } from 'src/app/shared/adapters/lists.adapter';
import { EMPTY_TODO } from 'src/app/shared/constants/todos';
import { TodosAdapter } from 'src/app/shared/adapters/todos.adapter';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent {
	public listsAdapter: ListsAdapter;
	public todosAdapter: TodosAdapter;

	public isListsMobileExpanded = false;
	public lists$: Observable<Lists>;
	public selectedList$: Observable<List>;
	public selectedTodo$: Observable<Todo>;
	public customLists$: Observable<Lists>;
	public filteredTodos$: Observable<Todos>;
	public todosGroupedByLists$: Observable<TodosGroupedByList>;
	public hasTodos$: Observable<boolean>;
	public showDetails$: Observable<boolean>;

	constructor(
		protected readonly route: ActivatedRoute,
		protected readonly injector: Injector
	) {
		const listsService = route.snapshot.data['listsService'];
		const todosService = route.snapshot.data['todosService'];

		this.todosAdapter = injector.get<any>(todosService);
		this.listsAdapter = injector.get<any>(listsService);

		this.lists$ = this.listsAdapter.getLists().pipe(shareReplay());

		this.selectedList$ = this.listsAdapter.getSelected().pipe(shareReplay());

		this.selectedTodo$ = this.todosAdapter.getSelected().pipe(shareReplay());

		this.customLists$ = this.lists$.pipe(
			map((lists) => lists.filter((list) => list.isCustom))
		);

		this.filteredTodos$ = this.todosAdapter.filteredTodos$;

		this.todosGroupedByLists$ = this.filteredTodos$.pipe(
			map((todos) => groupBy<Todo>(todos, 'list.title'))
		);

		this.hasTodos$ = this.todosGroupedByLists$?.pipe(
			first((groups) => !!groups),
			map((groups) => !!Object.keys(groups).length)
		);

		this.showDetails$ = this.selectedTodo$.pipe(
			map((selectedTodo) => !!selectedTodo?.id || selectedTodo?.isNew)
		);
	}

	public toggleLists(): void {
		this.isListsMobileExpanded = !this.isListsMobileExpanded;
	}

	public selectTodo(todo: Todo): void {
		this.todosAdapter.setSelected(todo);
	}

	public selectList(list: List): void {
		this.listsAdapter.setSelected(list);
	}

	public createList(listTitle: string): void {
		this.listsAdapter.createList(listTitle);
	}

	public createTodo(todo: Todo): void {
		this.todosAdapter.createTodo(todo);
	}

	public updateList(list: List): void {
		this.listsAdapter.updateList(list);
	}

	public updateTodo(todo: Todo): void {
		this.todosAdapter.updateTodo(todo);
	}

	public saveTodo(todo: Todo): void {
		if (todo.isNew) {
			const { isNew, ...rest } = todo;
			this.createTodo(rest);
		} else {
			this.updateTodo(todo);
		}

		this.selectTodo(undefined);
	}

	public addTodo(): void {
		this.todosAdapter.setSelected(EMPTY_TODO);
	}
}
