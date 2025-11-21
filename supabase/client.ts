import { createClient } from '@supabase/supabase-js';

import type { Database } from './types';

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL environment variable is not defined');
}

if (!process.env.SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    'SUPABASE_PUBLISHABLE_KEY environment variable is not defined',
  );
}

const client = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY,
);

export default client;
