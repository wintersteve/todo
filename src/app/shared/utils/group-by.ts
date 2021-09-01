/**
 * Groups object by one of its properties
 */
export interface Dict<T> {
	[key: string]: T[];
}

export function groupBy<T extends Record<string, any>>(
	items: T[],
	key: keyof T
): Dict<T> {
	return items.reduce(
		(result: Record<string, any>, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item],
		}),
		{}
	);
}
