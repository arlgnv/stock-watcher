import dayjs from 'dayjs';

import { createDailyMarketNewsEmail } from '@/nodemailer/emailCreators';
import nodemailer from '@/nodemailer/transporter';

import inngest from '../client';

const sendDailyMarketNewsEmail = inngest.createFunction(
  { id: 'send-daily-market-news-email' },
  [{ event: 'daily_market_news.prepared' }],
  async ({ step, event }) => {
    await step.run('send-email', async () => {
      await nodemailer.sendMail({
        to: event.data.userEmail,
        subject: `Today's market news summary - ${dayjs().format('dddd, MMMM D, YYYY')}`,
        html: createDailyMarketNewsEmail(event.data.marketNews),
      });
    });
  },
);

export default sendDailyMarketNewsEmail;
