export enum DEFAULT_LIST {
	INBOX = '307737360342188232',
	TODAY = '307737452442812608',
	URGENT = '307737471526895816',
	DONE = '307737510811795655',
}

export interface List {
	icon: string;
	id: string;
	isCustom: boolean;
	title: string;
}

export type Lists = List[];
