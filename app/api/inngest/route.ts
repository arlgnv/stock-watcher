import { serve } from 'inngest/next';

import client from '@/inngest/client';
import { sendWelcomeEmail, sendDailyNewsSummary } from '@/inngest/functions';

export const { GET, POST, PUT } = serve({
  client,
  functions: [sendWelcomeEmail, sendDailyNewsSummary],
});
