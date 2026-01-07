import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': [
    'prettier --ignore-unknown --list-different',
    'cspell --no-progress --no-summary',
  ],
  '*.{mjs,ts,mts,tsx}': 'eslint',
};

export default config;
