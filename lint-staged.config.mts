import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': 'prettier --check --ignore-unknown --cache --cache-location=node_modules/.cache/prettier --cache-strategy metadata',
  '*.{mjs,ts,mts,tsx}':
    'eslint --cache --cache-location=node_modules/.cache/eslint',

  '*.{ts,mts,tsx}': () => 'tsc --noEmit',
};

export default config;
