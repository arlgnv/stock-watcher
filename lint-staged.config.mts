import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': 'prettier --check --ignore-unknown --cache --cache-location=.prettiercache --cache-strategy metadata',
  '*.{mjs,ts,mts,tsx}': 'eslint --cache',
  '*.{ts,mts,tsx}': () => 'tsc --noEmit',
};

export default config;
