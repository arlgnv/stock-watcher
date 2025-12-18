// @ts-check

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
  ],
  ignorePaths: ['supabase/types.ts'],
});

export default config;
