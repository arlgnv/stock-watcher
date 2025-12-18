import { FINNHUB_STOCK_PROFILE_API_URL } from '@/constants';
import environment from '@/environment';
import type { CompanyProfile } from '@/types';
import { convertDaysToSeconds } from '@/utilities';

const POPULAR_STOCKS_SYMBOLS = [
  'AAPL',
  'MSFT',
  'GOOGL',
  'AMZN',
  'TSLA',
  'META',
  'NVDA',
  'NFLX',
  'ORCL',
  'CRM',
];

async function fetchPopularStocks() {
  const responses = (
    await Promise.allSettled(
      POPULAR_STOCKS_SYMBOLS.map((symbol) =>
        fetch(`${FINNHUB_STOCK_PROFILE_API_URL}?symbol=${symbol}`, {
          headers: {
            'X-Finnhub-Token': environment.FINNHUB_API_KEY,
          },
          next: {
            revalidate: convertDaysToSeconds(1),
          },
        }),
      ),
    )
  )
    .filter((settledResult) => settledResult.status === 'fulfilled')
    .map((fulfilledResult) => fulfilledResult.value);
  const popularStocks = (
    await Promise.allSettled(
      responses
        .filter(
          (response) =>
            response.ok &&
            response.headers.get('Content-Type')?.includes('application/json'),
        )
        .map<Promise<CompanyProfile>>((response) => response.json()),
    )
  )
    .filter((settledResult) => settledResult.status === 'fulfilled')
    .map((fulfilledResult) => fulfilledResult.value);

  return popularStocks;
}

export default fetchPopularStocks;
