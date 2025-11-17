import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL environment variable is not defined');
}

if (!process.env.SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    'SUPABASE_PUBLISHABLE_KEY environment variable is not defined',
  );
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY,
);

export default supabase;
