import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@helios/sdk': resolve(__dirname, '../libs/sdk/src/index.ts'),
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/plugin.ts'),
			name: 'AmpsController',
			formats: ['es'],
			fileName: 'plugin',
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime', 'react-router-dom', '@helios/sdk'],
		},
		outDir: 'dist',
		sourcemap: true,
		emptyOutDir: true,
	},
});
