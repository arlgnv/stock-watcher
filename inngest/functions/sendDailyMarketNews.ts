import dayjs from 'dayjs';

import { finnhub } from '@/axios/apis';
import type { MarketNews } from '@/axios/apis/finnhub/types';
import { generateDailyMarketNewsEmail } from '@/nodemailer/emailGenerators';
import nodemailer from '@/nodemailer/transporter';
import supabase from '@/supabase/client';

import client from '../client';

const sendDailyMarketNews = client.createFunction(
  { id: 'send-daily-market-news' },
  [{ cron: '0 12 * * *' }],
  async ({ step }) => {
    const users = await step.run(
      'fetch-users',
      async () => await supabase.from('users').select('email'),
    );

    if (users.data?.length) {
      const marketNews = await step.run(
        'fetch-latest-market-news',
        async () => await finnhub<MarketNews[]>('/news?category=general'),
      );

      if (marketNews.data.length) {
        await step.run('send-emails', () => {
          users.data.forEach(({ email }) => {
            void nodemailer.sendMail({
              to: email,
              subject: `Today's market news summary - ${dayjs().format('dddd, MMMM D, YYYY')}`,
              html: generateDailyMarketNewsEmail(marketNews.data),
            });
          });
        });
      }
    }
  },
);

export default sendDailyMarketNews;
