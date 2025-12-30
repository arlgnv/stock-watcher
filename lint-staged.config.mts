import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': [
    'prettier --check --ignore-unknown --cache --cache-strategy metadata --cache-location=node_modules/.cache/prettier',
    'cspell --no-progress --no-summary --cache --cache-strategy metadata --cache-location=node_modules/.cache/cspell',
  ],
  '*.{mjs,ts,mts,tsx}':
    'eslint --cache --cache-location=node_modules/.cache/eslint',
};

export default config;
