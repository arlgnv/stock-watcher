import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: ['supabase/types.ts'],
  ignoreDependencies: ['postcss'],
  'lint-staged': {
    config: 'lint-staged.config.mts',
  },
};

export default config;
