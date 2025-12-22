import { FINNHUB_API_URL } from '@/constants';
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

interface FetchPopularCompanyProfilesSuccess {
  status: 'success';
  data: CompanyProfile[];
}

interface FetchPopularCompanyProfilesFailure {
  status: 'error';
}

export type FetchPopularCompanyProfilesResponse =
  | FetchPopularCompanyProfilesSuccess
  | FetchPopularCompanyProfilesFailure;

async function fetchPopularCompanyProfiles(): Promise<FetchPopularCompanyProfilesResponse> {
  const responses = (
    await Promise.allSettled(
      POPULAR_STOCKS_SYMBOLS.map((symbol) =>
        fetch(`${FINNHUB_API_URL}/stock/profile2?symbol=${symbol}`, {
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
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);
  const popularCompaniesProfiles = (
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
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);

  return popularCompaniesProfiles.length
    ? { status: 'success', data: popularCompaniesProfiles }
    : { status: 'error' };
}

export default fetchPopularCompanyProfiles;
