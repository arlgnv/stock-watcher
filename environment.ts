import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

const environment = createEnv({
  skipValidation: process.env.SKIP_ENVS_VALIDATION === 'true',
  server: {
    SUPABASE_CONNECTION_STRING: z.url(),
    SUPABASE_URL: z.url(),
    SUPABASE_PUBLISHABLE_KEY: z.string().min(1),

    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z
      .url()
      .optional()
      .transform((value, ctx) => {
        if (process.env.VERCEL_ENV === 'preview') {
          if (typeof process.env.VERCEL_BRANCH_URL === 'undefined') {
            ctx.issues.push({
              input: value,
              code: 'custom',
              message: 'VERCEL_BRANCH_URL is required in preview environment',
            });

            return z.NEVER;
          }

          return `https://${process.env.VERCEL_BRANCH_URL}`;
        }

        if (typeof value === 'undefined') {
          ctx.issues.push({
            input: value,
            code: 'invalid_type',
            expected: 'string',
            message: 'Invalid input: expected string, received undefined',
          });

          return z.NEVER;
        }

        return value;
      }),

    GEMINI_API_KEY: z.string().min(1),

    GMAIL_ADDRESS: z.email(),
    GOOGLE_APP_PASSWORD: z.string().min(1),

    FINNHUB_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});

export default environment;
