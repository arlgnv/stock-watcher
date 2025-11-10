import { serve } from 'inngest/next';

import { inngest } from '@/inngest/client';
import { sendSignUpEmail, sendDailyNewsSummary } from '@/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendSignUpEmail, sendDailyNewsSummary],
});
