import { List } from '../models/lists';
import { v4 as uuidv4 } from 'uuid';

export const EMPTY_LIST: List = {
	id: uuidv4(),
	title: '',
	icon: 'layers',
	isCustom: true,
};
