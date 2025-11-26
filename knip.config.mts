import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: 'supabase/types.ts',
  next: {
    config: 'next.config.mts',
  },
  'lint-staged': {
    config: 'lint-staged.config.mts',
  },
};

export default config;
