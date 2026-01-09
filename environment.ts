import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

const environment = createEnv({
  skipValidation: process.env.SKIP_ENVS_VALIDATION === 'true',
  server: {
    SUPABASE_CONNECTION_STRING: z.url(),
    SUPABASE_URL: z.url(),
    SUPABASE_PUBLISHABLE_KEY: z.string().min(1),

    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.transform((value, ctx) => {
      if (process.env.VERCEL_ENV === 'preview') {
        // It is safe to assert that VERCEL_BRANCH_URL is defined, because Vercel guarantees that it will be set in preview environment
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return `https://${process.env.VERCEL_BRANCH_URL!}`;
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

      const valueSafeParseResult = z.url().safeParse(value);

      if (valueSafeParseResult.error) {
        ctx.issues.push({
          input: valueSafeParseResult.data,
          code: 'invalid_format',
          format: 'url',
          message: 'Invalid URL',
        });

        return z.NEVER;
      }

      return valueSafeParseResult.data;
    }),

    GEMINI_API_KEY: z.string().min(1),

    GMAIL_ADDRESS: z.email(),
    GOOGLE_APP_PASSWORD: z.string().min(1),

    FINNHUB_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});

export default environment;
