// import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export const sharedTestConfig = defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./test.setup.ts'],
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'json-summary', 'html'],
			// reportsDirectory: resolve(__dirname, '../../coverage/plugins/amps-controller'),
			exclude: [
				'node_modules/',
				'test/',
				'**/*.config.ts',
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/test/**',
				'**/tests/**',
				'**/__tests__/**',
			],
		},
	},
});
