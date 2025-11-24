import { serve } from 'inngest/next';

import inngest from '@/inngest/client';
import {
  sendWelcomeEmail,
  prepareDailyMarketNews,
  sendDailyMarketNewsEmail,
} from '@/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendWelcomeEmail,
    prepareDailyMarketNews,
    sendDailyMarketNewsEmail,
  ],
});
