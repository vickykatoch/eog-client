import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@helios/amps-controller': resolve(__dirname, '../plugins/amps-controller/src/plugin.ts'),
			'@helios/sdk': resolve(__dirname, '../libs/sdk/src/index.ts'),
		},
	},
	build: {
		outDir: resolve(__dirname, '../dist'),
		emptyOutDir: true,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'json-summary', 'html'],
			reportsDirectory: resolve(__dirname, '../coverage/shell'),
			exclude: [
				'node_modules/',
				'src/test/',
				'**/*.config.ts',
				'**/*.config.js',
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
