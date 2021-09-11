import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List, Lists } from '../models/lists';
import { Todo, Todos } from '../models/todos';

@Injectable({
	providedIn: 'root',
})
export abstract class TodosAdapter {
	abstract filteredTodos$: Observable<Todos>;

	abstract getTodos(): Observable<Todos>;

	abstract getSelected(): Observable<Todo>;

	abstract setSelected(todo: Todo): void;

	abstract createTodo(todo: Todo): void;

	abstract updateTodo(todo: Todo): void;

	abstract load(): void;

	abstract findByList(selectedList: List, todos: Todo[]): Todos;
}
