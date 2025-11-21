import { serve } from 'inngest/next';

import client from '@/inngest/client';
import { sendWelcomeEmail, sendDailyMarketNews } from '@/inngest/functions';

export const { GET, POST, PUT } = serve({
  client,
  functions: [sendWelcomeEmail, sendDailyMarketNews],
});
