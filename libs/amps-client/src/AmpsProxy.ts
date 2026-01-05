import { type Filter as AmpsFilter, buildAmpsFilter } from '@helios/filter-api';
import type { CommandParams, Message } from 'amps';
import ConnectionManager from './connection-manager';
import type { AmpsConnectionConfig, DataMessage } from './types';

export class AmpsProxy {
	constructor(readonly connectionConfig: AmpsConnectionConfig) {}

	async fetch<T = unknown>(
		_filterRule: AmpsFilter,
		_params?: CommandParams,
	): Promise<DataMessage<T>> {
		const filterString = buildAmpsFilter(_filterRule);
		const connection = ConnectionManager.getConnection(this.connectionConfig);
		const client = await connection.getClient();
		const { topic } = this.connectionConfig;

		return new Promise<DataMessage<T>>((resolve) => {
			const sowData: T[] = [];
			const onMessage = ({ header, data }: Message) => {
				console.log('Received AMPS message:', { header, data });
				const command = header.command();
				if (command === 'group_end') {
					connection.dispose();
					resolve({ type: 'sow', data: sowData });
				} else {
					data && sowData.push(data);
				}
			};
			client.sow(onMessage, topic, filterString, _params);
		});
	}

	subscribe(_filterRule: AmpsFilter, _params?: CommandParams) {}
	publish(_filterRule: AmpsFilter, _params?: CommandParams) {}
	delete(_filterRule: AmpsFilter, _params?: CommandParams) {}
}
export function createAmpsProxy(config: AmpsConnectionConfig): AmpsProxy {
	return new AmpsProxy(config);
}
