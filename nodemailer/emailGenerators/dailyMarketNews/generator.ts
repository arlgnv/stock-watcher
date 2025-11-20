import dayjs from 'dayjs';

import type { MarketNews } from '@/axios/apis/finnhub/types';

import TEMPLATE from './template';

function generator(marketNews: MarketNews[]) {
  return TEMPLATE.replace(
    '{{date}}',
    dayjs().format('dddd, MMMM D, YYYY'),
  ).replace(
    '{{news}}',
    marketNews
      .map(({ headline, summary }) => `<p>${headline}</p><p>${summary}</p>`)
      .join(''),
  );
}

export default generator;
