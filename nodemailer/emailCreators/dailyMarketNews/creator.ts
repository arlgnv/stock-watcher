import dayjs from 'dayjs';

import type { MarketNews } from '@/finnhub/types';

import TEMPLATE from './template';

function creator(marketNews: MarketNews[]) {
  return TEMPLATE.replace(
    '{{date}}',
    dayjs().format('dddd, MMMM D, YYYY'),
  ).replace(
    '{{news}}',
    marketNews
      .map(
        ({ headline, summary }) =>
          `<li><p>${headline}</p><p>${summary}</p></li>`,
      )
      .join(''),
  );
}

export default creator;
