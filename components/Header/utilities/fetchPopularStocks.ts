import type { AxiosResponse } from 'axios';

import finnhub from '@/finnhub/api';
import type { CompanyProfile } from '@/finnhub/types';

async function fetchPopularStocks() {
  const promiseSettledResults = await Promise.allSettled([
    finnhub<CompanyProfile>('/stock/profile2?symbol=AAPL'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=MSFT'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=GOOGL'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=AMZN'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=TSLA'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=META'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=NVDA'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=NFLX'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=ORCL'),
    finnhub<CompanyProfile>('/stock/profile2?symbol=CRM'),
  ]);
  const promiseFulfilledResults = promiseSettledResults.filter(
    (result): result is PromiseFulfilledResult<AxiosResponse<CompanyProfile>> =>
      result.status === 'fulfilled',
  );
  const popularStocks = promiseFulfilledResults.map(({ value }) => value.data);

  return popularStocks;
}

export default fetchPopularStocks;
