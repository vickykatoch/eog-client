import { defineConfig } from 'vite';
import { resolve } from 'path';
import { basePlugins } from '../../vite.config.react.base';

export default defineConfig({
   plugins: basePlugins,
   build: {
      outDir: resolve(__dirname, '../../dist/apps/view-hub'),
      emptyOutDir: true,
   },
   server: {
      port: 5173,
   },
});
