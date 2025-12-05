import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': 'prettier --check --ignore-unknown',
  '*.{mjs,ts,mts,tsx}': 'eslint',
  '*.{ts,mts,tsx}': () => 'tsc --noEmit',
};

export default config;
