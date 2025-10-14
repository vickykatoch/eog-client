import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
   plugins: [
      react(),
      dts({
         entryRoot: 'src',
         outDir: resolve(__dirname, '../../dist/packages/components'),
      }),
   ],
   build: {
      outDir: resolve(__dirname, '../../dist/packages/components'),
      emptyOutDir: true,
      lib: {
         entry: 'src/index.ts',
         name: 'Components',
         formats: ['es', 'cjs'],
         fileName: (format) => `components.${format}.js`,
      },
      rollupOptions: {
         external: ['react', 'react-dom', 'react/jsx-runtime', '@salt-ds/core'],
         output: {
            globals: {
               react: 'React',
               'react-dom': 'ReactDOM',
               '@salt-ds/core': 'SaltCore',
            },
         },
      },
   },
   test: {
      environment: 'jsdom',
      globals: true,
      include: ['src/**/*.test.{ts,tsx}'],
   },
});
