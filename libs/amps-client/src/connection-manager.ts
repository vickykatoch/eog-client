import { Client, DefaultServerChooser } from 'amps';
import type { AmpsConnectionConfig } from './types';

class ConnectionManager {
	private readonly _connections = [] as AmpsConnection[];

	getConnection(config: AmpsConnectionConfig): AmpsConnection {
		const connection = new AmpsConnection(config, () => {
			const index = this._connections.indexOf(connection);
			if (index !== -1) {
				this._connections.splice(index, 1);
			}
		});
		this._connections.push(connection);
		return connection;
	}
}
class AmpsConnection {
	private client?: Client;
	constructor(
		private config: AmpsConnectionConfig,
		private onDispose: () => void,
	) {}

	getClient(): Promise<Client> {
		if (!this.client) {
			const { name, url } = this.config;
			const connectionName = `${name}-${crypto.randomUUID()}`;
			const client = new Client(connectionName);
			this.client = client;
			client.ackTimeout(10 * 10000);
			const defaultChooser = new DefaultServerChooser();
			defaultChooser.add(url);
			client.serverChooser(defaultChooser);
			client.ackBatchSize(10 * 10000);
			return client.connect().then((msg) => {
				console.log('AMPS Client connected:', msg);
				return client;
			});
		}
		console.log('AMPS Client already connected:', this.client);
		return Promise.resolve(this.client);
	}

	dispose() {
		this.client
			?.disconnect()
			.then(() => {
				console.log('AMPS Client disconnected');
				this.onDispose();
			})
			.catch((err) => {
				console.error('Error disconnecting AMPS Client:', err);
			});
	}
}
export default new ConnectionManager();
