import { Component, OnInit } from '@angular/core';
import { list } from 'src/app/shared/interfaces/list';
import { todo } from 'src/app/shared/interfaces/todo';
import { ListsService } from 'src/app/shared/services/lists/lists.service';
import { TodosService } from 'src/app/shared/services/todos/todos.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
	isListsMobileExpanded: boolean = false;
	selectedTodo: todo = this.todosService.emptyTodo;
	selectedList: list = this.listsService.emptyList;
	todos: todo[] = [];

	constructor(
		private listsService: ListsService,
		private todosService: TodosService
	) {}

	toggleLists(): void {
		this.isListsMobileExpanded = !this.isListsMobileExpanded;
	}

	select(id: string): void {
		if (this.selectedTodo.id === id) return this.cancel();
		this.selectedTodo = this.todosService.find(id);
	}

	selectList(list: list): void {
		this.selectedList = list;
		this.loadTodos();
	}

	cancel(): void {
		this.selectedTodo = this.todosService.emptyTodo;
	}

	loadTodos(): void {
		this.todos = this.todosService.findByList(this.selectedList.title);
	}

	clickTodo(id: string): void {
		// this.sort();
	}

	saveTodo(todo: todo): void {
		console.log(todo);
		if (todo.new) {
			delete todo.new;
			this.todosService.create(todo);
		} else this.todosService.update(todo);
		this.cancel();
		this.loadTodos();
	}

	addTodo(): void {
		const newTodo: todo = { ...this.todosService.emptyTodo, new: true };
		this.selectedTodo = newTodo;
	}

	sort(): void {
		this.todosService.sort();
	}

	loadInititalList(): void {
		this.selectedList = this.listsService.all()[0];
	}

	ngOnInit(): void {
		this.loadInititalList();
		this.loadTodos();
		// this.sort();
	}
}
