import react from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import typescript from 'typescript-eslint';

const config = defineConfig([
  globalIgnores(['.next/']),
  {
    name: 'react',
    files: ['**/*.tsx'],
    extends: [react.configs['strict-type-checked']],
  },
  {
    name: 'js',
    files: ['**/*.{mjs,ts,tsx}'],
    plugins: {
      js,
    },
    extends: ['js/recommended'],
  },
  {
    name: 'next',
    files: ['**/*.tsx'],
    extends: [next.configs['core-web-vitals']],
  },
  {
    name: 'perfectionist',
    files: ['**/*.{mjs,ts,tsx}'],
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
    name: 'typescript',
    files: ['**/*.{ts,tsx}'],
    extends: [
      typescript.configs.strictTypeChecked,
      typescript.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
]);

export default config;
