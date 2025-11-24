import { serve } from 'inngest/next';

import inngestClient from '@/inngest/client';
import {
  sendWelcomeEmail,
  prepareDailyMarketNews,
  sendDailyMarketNewsEmail,
} from '@/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [
    sendWelcomeEmail,
    prepareDailyMarketNews,
    sendDailyMarketNewsEmail,
  ],
});
