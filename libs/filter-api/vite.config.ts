import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'FilterAPI',
			formats: ['es'],
			fileName: 'index',
		},
		outDir: 'dist',
		sourcemap: true,
		emptyOutDir: true,
	},
});
