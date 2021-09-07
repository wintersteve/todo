import { Variables } from '../models';

export function sanitizeInput(input: any): Variables {
	const { id, userId, list, ...safe } = input;

	return safe;
}
