import { FINNHUB_API_URL } from '@/constants';
import environment from '@/environment';
import supabase from '@/supabase/client';
import type { MarketNews } from '@/types';

import inngest from '../client';
import type { DailyMarketNewsPreparedEvent } from '../types';

const prepareDailyMarketNews = inngest.createFunction(
  { id: 'prepare-daily-market-news' },
  [{ cron: '0 12 * * *' }],
  async ({ step }) => {
    const fetchMarketNewsResponse = await step.fetch(
      `${FINNHUB_API_URL}/news?category=general`,
      {
        headers: {
          'X-Finnhub-Token': environment.FINNHUB_API_KEY,
        },
      },
    );

    const marketNews = await step.run('extract-market-news', async () => {
      const marketNews = (await fetchMarketNewsResponse.json()) as MarketNews[];

      return marketNews.slice(0, 5);
    });

    if (marketNews.length) {
      const users = await step.run('fetch-users', async () => {
        const fetchUsersResponse = await supabase.from('users').select('email');

        if (fetchUsersResponse.error) {
          throw fetchUsersResponse.error;
        }

        return fetchUsersResponse.data;
      });

      if (users.length) {
        const dailyMarketNewsPreparedEvents =
          users.map<DailyMarketNewsPreparedEvent>(({ email }) => ({
            name: 'daily_market_news.prepared',
            data: {
              userEmail: email,
              marketNews: marketNews.slice(0, 5),
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
