import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': ['prettier --check --ignore-unknown', 'eslint'],
};

export default config;
