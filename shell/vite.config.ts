import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
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
});
