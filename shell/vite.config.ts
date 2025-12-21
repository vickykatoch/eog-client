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
});
