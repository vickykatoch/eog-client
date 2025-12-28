import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'Core',
			formats: ['es'],
			fileName: 'HeliosCore',
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime', 'react-router-dom'],
		},
		outDir: 'dist',
		sourcemap: true,
		emptyOutDir: true,
	},
});
