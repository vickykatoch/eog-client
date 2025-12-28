import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'Styles',
			formats: ['es'],
			fileName: 'HeliosStyles',
		},
		outDir: 'dist',
		sourcemap: true,
		emptyOutDir: true,
	},
	test: {
		globals: true,
		environment: 'node',
		setupFiles: './test.setup.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'json-summary', 'html'],
			reportsDirectory: resolve(__dirname, '../../coverage/libs/styles'),
			exclude: [
				'node_modules/',
				'test/',
				'**/*.config.ts',
				'**/*.test.ts',
				'**/*.spec.ts',
				'**/test/**',
				'**/tests/**',
				'**/__tests__/**',
			],
		},
	},
});
