export function getNestedObjectProperty(
	obj: Record<string, any>,
	key: string
): string {
	const value = key.split('.').reduce((acc, prop) => acc[prop], obj);

	if (typeof value !== 'string') {
		throw new Error('The computed value must be a string');
	}

	return value;
}
