import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/vitest.setup.ts'],
      include: ['tests/*.{test,spec}.{ts,tsx}'],
      exclude: [
         'node_modules',
         'dist',
         '**/vitest.setup.ts',
         '**/node_modules/**',
         '**/dist/**',
         '**/examples/**',
         'vite.config.ts',
         'vitest.setup.ts',
         '**/*.config.ts',
      ],
      coverage: {
         provider: 'istanbul', // or 'c8'
         reporter: ['text', 'html'],
         reportsDirectory: resolve(__dirname, '../../coverage'),
      },
   },
});
