import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
   build: {
      outDir: path.resolve(__dirname, '../../dist/packages/eog-client'),
      emptyOutDir: true,
      lib: {
         entry: path.resolve(__dirname, 'src/index.ts'),
         name: 'EogClient',
         formats: ['es', 'cjs'],
         fileName: (format) => (format === 'es' ? 'eog-client.es.js' : 'eog-client.cjs.js'),
      },
      rollupOptions: {
         external: [],
      },
      sourcemap: true,
   },
   plugins: [
      dts({
         insertTypesEntry: true,
         tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
      }),
   ],
   resolve: {
      alias: {},
   },
});
