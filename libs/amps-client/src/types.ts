import type { Authenticator } from 'amps';

export enum QueryType {
	Sow = 'sow',
	Subscribe = 'subscribe',
	SowAndSubscribe = 'sowandsubscribe',
	SowAndDeltaSubscribe = 'sowanddeltasubscribe',
}
export interface AmpsConnectionConfig {
	id: string;
	url: string;
	userId?: string;
	topic: string;
	authenticator?: Authenticator;
}
export interface DataMessage<TData = unknown> {
	type: 'sow' | 'update' | 'delete' | 'delta';
	data: TData[];
}
