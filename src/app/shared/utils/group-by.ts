import { Dict } from '../models';
import { getNestedObjectProperty } from './get-nested-object-property';

/**
 * Groups object by one of its properties
 */
export function groupBy<T extends Record<string, any>>(
	items: T[],
	key: string
): Dict<T> {
	return items.reduce((result: Record<string, any>, item) => {
		const value = getNestedObjectProperty(item, key);

		return {
			...result,
			[value]: [...(result[value] || []), item],
		};
	}, {});
}
