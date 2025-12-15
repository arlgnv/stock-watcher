import { createClient } from '@supabase/supabase-js';

import environment from '@/environment';

import type { Database } from './types';

const client = createClient<Database>(
  environment.SUPABASE_URL,
  environment.SUPABASE_PUBLISHABLE_KEY,
);

export default client;
