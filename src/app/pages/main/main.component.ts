import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { Dict, groupBy } from 'src/app/shared/utils/group-by';
import { ListsService } from 'src/app/shared/services/lists/lists.service';
import { Todo, TodosGroupedByList } from 'src/app/shared/models/todos';
import {
	EMPTY_TODO,
	TodosService,
} from 'src/app/shared/services/todos/todos.service';
import { List, Lists } from 'src/app/shared/models/lists';
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent {
	public isListsMobileExpanded = false;

	public readonly lists$ = this.listsService.getLists().pipe(shareReplay());

	public readonly selectedList$ = this.listsService
		.getSelected()
		.pipe(shareReplay());

	public readonly selectedTodo$ = this.todosService
		.getSelected()
		.pipe(shareReplay());

	public readonly customLists$ = this.lists$.pipe(
		map((lists) => lists.filter((list) => list.isCustom))
	);

	public readonly filteredTodos$ = this.todosService.filteredTodos$;

	public readonly todosGroupedByLists$: Observable<TodosGroupedByList> =
		combineLatest([this.filteredTodos$, this.lists$]).pipe(
			map(
				([todos, lists]) =>
					[groupBy<Todo>(todos, 'listId'), lists] as [Dict<Todo>, Lists]
			),

			map(([todos, lists]) =>
				Object.entries(todos).reduce((acc, [listId, todos]) => {
					const match = lists.find((list: List) => list.id === listId);

					return { ...acc, [listId]: { list: match, todos } };
				}, {})
			)
		);

	public readonly hasTodos$ = this.todosGroupedByLists$.pipe(
		first((groups) => !!groups),
		map((groups) => !!Object.keys(groups).length)
	);

	public readonly showDetails$ = this.selectedTodo$.pipe(
		map((selectedTodo) => !!selectedTodo?.id || selectedTodo?.isNew)
	);

	constructor(
		private readonly listsService: ListsService,
		private readonly todosService: TodosService
	) {}

	public toggleLists(): void {
		this.isListsMobileExpanded = !this.isListsMobileExpanded;
	}

	public selectTodo(todo: Todo): void {
		this.todosService.setSelected(todo);
	}

	public selectList(list: List): void {
		this.listsService.setSelected(list);
	}

	public clickTodo(todo: Todo): void {
		this.todosService.updateTodo(todo).subscribe();
	}

	public saveTodo(todo: Todo): void {
		if (todo.isNew) {
			const { id, isNew, ...rest } = todo;
			console.log('CREATE', rest);
		} else {
			console.log('UPDATE', todo);
			// this.faunaService.updateTodo(todo).subscribe();
		}

		this.selectTodo(undefined);
	}

	public addTodo(): void {
		this.todosService.setSelected(EMPTY_TODO);
	}
}
