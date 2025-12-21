class IoC {
	private instances: Map<string, any> = new Map();

	register<T>(identifier: string, instance: T): void {
		this.instances.set(identifier, instance);
	}

	resolve<T>(identifier: string): T {
		const instance = this.instances.get(identifier);
		if (!instance) {
			throw new Error(`No instance found for identifier: ${identifier}`);
		}
		return instance as T;
	}
}
export default new IoC();
