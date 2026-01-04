import type { Filter as AmpsFilter } from '@helios/filter-api';
import type { CommandParams } from 'amps';
import { AmpsConnection } from './amps-connection';
import type { AmpsConnectionConfig, DataMessage } from './types';

export class AmpsProxy {
	private readonly _connection: AmpsConnection;

	constructor(readonly connectionConfig: AmpsConnectionConfig) {
		this._connection = new AmpsConnection(connectionConfig);
	}

	fetch<T = unknown>(_filterRule: AmpsFilter, _params?: CommandParams): Promise<DataMessage<T>> {
		console.log(this._connection);
		return Promise.resolve({ type: 'sow', data: [] });
	}

	subscribe(_filterRule: AmpsFilter, _params?: CommandParams) {}
	publish(_filterRule: AmpsFilter, _params?: CommandParams) {}
	delete(_filterRule: AmpsFilter, _params?: CommandParams) {}
}
export function createAmpsProxy(config: AmpsConnectionConfig): AmpsProxy {
	return new AmpsProxy(config);
}
