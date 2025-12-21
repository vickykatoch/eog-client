import { beforeEach, describe, expect, it } from 'vitest';
import { AmpsClient } from './amps-client';

describe('AmpsClient', () => {
	let client: AmpsClient;

	beforeEach(() => {
		client = new AmpsClient('tcp://localhost:9090/amps/json');
	});

	it('should create an instance', () => {
		expect(client).toBeInstanceOf(AmpsClient);
	});

	it('should not be connected initially', () => {
		expect(client.isConnected()).toBe(false);
	});

	it('should connect successfully', async () => {
		await client.connect();
		expect(client.isConnected()).toBe(true);
	});

	it('should disconnect successfully', async () => {
		await client.connect();
		await client.disconnect();
		expect(client.isConnected()).toBe(false);
	});

	it('should throw error when subscribing without connection', async () => {
		await expect(client.subscribe('test-topic', () => {})).rejects.toThrow(
			'Client is not connected',
		);
	});

	it('should throw error when publishing without connection', async () => {
		await expect(client.publish('test-topic', { data: 'test' })).rejects.toThrow(
			'Client is not connected',
		);
	});
});
