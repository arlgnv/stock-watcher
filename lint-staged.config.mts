import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': [
    'prettier --check --ignore-unknown --cache --cache-location=node_modules/.cache/prettier --cache-strategy metadata',
    'cspell --no-progress --no-summary',
  ],
  '*.{mjs,ts,mts,tsx}':
    'eslint --cache --cache-location=node_modules/.cache/eslint',
};

export default config;
