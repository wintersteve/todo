export interface todo {
	id: string;
	title: string;
	notes: string;
	list: string;
	doneUntil: Date;
	urgent: boolean;
	done: boolean;
	new?: true;
}
