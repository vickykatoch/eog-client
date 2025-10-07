// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
   js.configs.recommended,
   ...tseslint.configs.recommended,
   {
      ignores: [
         'dist/',
         'coverage/',
         'node_modules/',
         'vite.config.ts',
         'vitest.config.ts',
         'tests/vitest.setup.ts',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      plugins: { prettier },
      rules: {
         'prettier/prettier': 'warn',

         // ✅ blank line after functions/classes/blocks
         'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'function', next: '*' }, // ← remove "function*"
            { blankLine: 'always', prev: 'class', next: '*' },
            { blankLine: 'always', prev: 'block-like', next: '*' },
            // optional: don't force blank line before a return
            { blankLine: 'any', prev: '*', next: 'return' },
         ],
      },
   },
   // Disable stylistic conflicts with Prettier
   prettierConfig
);
