// @ts-check

import react from '@eslint-react/eslint-plugin';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import typescript from 'typescript-eslint';

const config = defineConfig([
  globalIgnores(['supabase/types.ts'], 'Global ignores'),
  includeIgnoreFile(
    path.resolve(import.meta.dirname, '.gitignore'),
    '.gitignore patterns',
  ),
  {
    name: 'React',
    files: ['**/*.tsx'],
    extends: [react.configs['strict-type-checked']],
  },
  {
    name: 'JavaScript',
    files: ['**/*.{mjs,ts,mts,tsx}'],
    plugins: {
      js,
    },
    extends: ['js/recommended'],
  },
  {
    name: 'Next.js',
    files: ['**/*.tsx'],
    extends: [next.configs['core-web-vitals']],
  },
  {
    name: 'Sorting',
    files: ['**/*.{mjs,ts,mts,tsx}'],
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          tsconfigRootDir: import.meta.dirname,
          groups: [
            ['builtin-type', 'builtin', 'external-type', 'external'],
            ['internal-type', 'internal'],
            [
              'parent-type',
              'parent',
              'sibling-type',
              'sibling',
              'index-type',
              'index',
            ],
          ],
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          type: 'natural',
        },
      ],
    },
  },
  {
    name: 'TypeScript',
    files: ['**/*.{ts,mts,tsx}'],
    extends: [
      typescript.configs.strictTypeChecked,
      typescript.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
]);

export default config;
