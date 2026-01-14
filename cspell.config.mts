import { defineConfig } from 'cspell';

const config = defineConfig({
  useGitignore: true,
  words: [
    'signalist',
    'commitlint',
    'inngest',
    'supabase',
    'hotlist',
    'watchlist',
    'tradingview',
    'elon',
    'finnhub',
    'nodemailer',
    'cmdk',
    'cellspacing',
    'Segoe',
    'weburl',
    'docstrings',
    'debouncer',
    'cli',
    'zod',
    'arlgnv',
    'watchlists',
    'forex',
    'knip',
    'typegen',
    'env',
    'coderabbit',
    'coderabbitai',
    'shadcn',
  ],
  ignorePaths: ['supabase/types.ts'],
});

export default config;
