export interface AmpsControllerState {
	queryBuilder: QueryBuilderState;
}

export interface AmpsServer {
	name: string;
	url: string;
	fallbackUrl?: string;
	requireUserAuth?: boolean;
	oboPath?: boolean;
	empty?: boolean;
}

export interface QueryBuilderState {
	server: AmpsServer;
}
export type AmpsControllerAction = { type: 'UPDATE-QB'; payload: Partial<QueryBuilderState> };
