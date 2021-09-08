import { Injectable } from '@angular/core';

export enum Route {
	GET_TODOS = 'todos-get',
	UPDATE_TODO = 'todos-update',
	CREATE_TODO = 'todos-create',
	CREATE_LIST = 'lists-create',
	GET_LISTS = 'lists-get',
}

@Injectable({
	providedIn: 'root',
})
export class EndpointService {
	private readonly prefix = 'api';

	public get(route: string) {
		return `/${this.prefix}/${route}`;
	}
}
