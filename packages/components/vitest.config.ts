import { defineConfig } from 'vitest/config';

export default defineConfig({
   test: {
      environment: 'jsdom', // or "node"
      setupFiles: ['./tests/vitest.setup.ts'],
      coverage: {
         provider: 'istanbul', // or 'c8'
         reporter: ['text', 'html'],
         reportsDirectory: '../../coverage',
      },
      exclude: [
         'node_modules',
         'dist',
         '**/node_modules/**',
         '**/dist/**',
         '**/examples/**',
         'vite.config.ts',
         'vitest.setup.ts',
         '**/*.config.ts',
      ],
      // Ensure TS in tests uses the test tsconfig:
      globals: true,
   },
});
