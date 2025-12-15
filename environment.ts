import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const environment = createEnv({
  server: {
    SUPABASE_CONNECTION_STRING: z.url(),
    SUPABASE_URL: z.url(),
    SUPABASE_PUBLISHABLE_KEY: z.string().min(1),

    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),

    GEMINI_API_KEY: z.string().min(1),

    GOOGLE_EMAIL: z.email(),
    GOOGLE_APP_PASSWORD: z.string().min(1),

    FINNHUB_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});

export default environment;
