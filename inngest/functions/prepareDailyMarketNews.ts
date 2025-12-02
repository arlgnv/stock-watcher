import finnhub from '@/finnhub/api';
import type { MarketNews } from '@/finnhub/types';
import supabase from '@/supabase/client';

import inngest from '../client';
import type { DailyMarketNewsPreparedEvent } from '../types';

const prepareDailyMarketNews = inngest.createFunction(
  { id: 'prepare-daily-market-news' },
  [{ cron: '0 12 * * *' }],
  async ({ step }) => {
    const users = await step.run(
      'fetch-users',
      async () => await supabase.from('users').select('email'),
    );

    if (users.data?.length) {
      const marketNews = await step.run(
        'fetch-market-news',
        async () => await finnhub<MarketNews[]>('/news?category=general'),
      );

      if (marketNews.data.length) {
        const dailyMarketNewsPreparedEvents: DailyMarketNewsPreparedEvent[] =
          users.data.map(({ email }) => ({
            name: 'daily_market_news.prepared',
            data: {
              userEmail: email,
              marketNews: marketNews.data,
            },
          }));

        await step.sendEvent(
          'send-daily-market-news-prepared-events',
          dailyMarketNewsPreparedEvents,
        );
      }
    }
  },
);

export default prepareDailyMarketNews;
