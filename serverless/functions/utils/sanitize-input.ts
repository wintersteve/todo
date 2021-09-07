import { Variables } from '../models';

export function sanitizeInput(input: any): Variables {
	const { id, userId, ...safe } = input;

	return safe;
}
