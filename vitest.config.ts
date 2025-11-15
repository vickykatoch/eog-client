import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   test: {
      include: ['apps/**/tests/*.{test,spec}.{ts,tsx}', 'packages/**/tests/*.{test,spec}.{ts,tsx}'],
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
         reporter: ['text', 'html'],
         provider: 'v8',
         exclude: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'coverage/**',
            '**/*.d.ts',
            '**/*.config.*',
            '**/tests/**',
            '**/*.test.*',
            '**/*.spec.*',
            '**/test/**',
            '**/__tests__/**',
            '**/vitest.setup.*',
         ],
      },
   },
});
