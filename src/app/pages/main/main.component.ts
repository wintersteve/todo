import { Component } from '@angular/core';
import { isToday, parseISO } from 'date-fns';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
	filter,
	first,
	map,
	shareReplay,
	switchMap,
	take,
} from 'rxjs/operators';
import { Dict, groupBy } from 'src/app/shared/utils/group-by';
import {
	FaunaService,
	List,
	Todo,
} from 'src/app/shared/services/fauna.service';
import { ListsService } from 'src/app/shared/services/lists/lists.service';

export interface TodosGroupedByList {
	[key: string]: {
		list: List;
		todos: Todo[];
	};
}

export const EMPTY_TODO: Todo = {
	id: '',
	title: '',
	notes: '',
	listId: '',
	deadline: undefined,
	isUrgent: false,
	isDone: false,
	isNew: true,
};

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

	public readonly selectedTodo$ = new BehaviorSubject<Todo>(undefined);

	public readonly customLists$ = this.lists$.pipe(
		map((lists) => lists.filter((list) => list.isCustom))
	);

	public readonly filteredTodos$ = this.selectedList$.pipe(
		filter((selectedList) => !!selectedList),
		switchMap((selectedList) =>
			this.faunaService
				.getTodos()
				.pipe(map((todos) => this.findByList(selectedList, todos)))
		),
		shareReplay()
	);

	public readonly todosGroupedByLists$: Observable<TodosGroupedByList> =
		combineLatest([this.filteredTodos$, this.lists$]).pipe(
			map(
				([todos, lists]) =>
					[groupBy<Todo>(todos, 'listId'), lists] as [Dict<Todo>, List[]]
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
		private readonly faunaService: FaunaService,
		private readonly listsService: ListsService
	) {}

	public toggleLists(): void {
		this.isListsMobileExpanded = !this.isListsMobileExpanded;
	}

	public selectTodo(todo: Todo): void {
		this.selectedTodo$.next(todo);
	}

	public selectList(list: List): void {
		this.listsService.setSelected(list);
	}

	public resetSelectedTodo(): void {
		this.selectedTodo$.next(undefined);
	}

	public clickTodo(todo: Todo): void {
		this.faunaService.updateTodo(todo).subscribe();
	}

	public saveTodo(todo: Todo): void {
		if (todo.isNew) {
			const { id, isNew, ...rest } = todo;
			console.log('CREATE', rest);
		} else {
			console.log('UPDATE', todo);
			// this.faunaService.updateTodo(todo).subscribe();
		}
		this.resetSelectedTodo();
	}

	public addTodo(): void {
		this.selectedTodo$.next(EMPTY_TODO);
	}

	private findByList(selectedList: List, todos: Todo[]): Todo[] {
		switch (selectedList.title) {
			case 'Inbox':
				return todos;
			case 'Today':
				return todos.filter((todo) => isToday(parseISO(todo.deadline)));
			case 'Urgent':
				return todos.filter((todo) => todo.isUrgent);
			case 'Done':
				return todos.filter((todo) => todo.isDone);
			default:
				return todos.filter((todo) => todo.listId === selectedList.id);
		}
	}
}
