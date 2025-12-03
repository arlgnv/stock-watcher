import finnhub from '@/finnhub/api';
import type { MarketNews } from '@/finnhub/types';
import supabase from '@/supabase/client';

import inngest from '../client';
import type { DailyMarketNewsPreparedEvent } from '../types';

const prepareDailyMarketNews = inngest.createFunction(
  { id: 'prepare-daily-market-news' },
  [{ cron: '0 12 * * *' }],
  async ({ step }) => {
    const marketNews = await step.run('fetch-market-news', async () => {
      const fetchMarketNewsRequestResponse = await finnhub<MarketNews[]>(
        '/news?category=general',
      );

      return fetchMarketNewsRequestResponse.data.slice(0, 5);
    });

    if (marketNews.length) {
      const users = await step.run('fetch-users', async () => {
        const fetchUsersRequestResponse = await supabase
          .from('users')
          .select('email');

        if (fetchUsersRequestResponse.error) {
          throw fetchUsersRequestResponse.error;
        }

        return fetchUsersRequestResponse.data;
      });

      if (users.length) {
        const dailyMarketNewsPreparedEvents =
          users.map<DailyMarketNewsPreparedEvent>(({ email }) => ({
            name: 'daily_market_news.prepared',
            data: {
              userEmail: email,
              marketNews,
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
