import type { FetchPopularCompanyProfilesResponse } from '../Header/utilities/fetchPopularCompanyProfiles';

export interface Props {
  fetchPopularCompanyProfilesResponse: FetchPopularCompanyProfilesResponse;
}

export interface SymbolLookup {
  count: number;
  result: {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
  }[];
}

export interface Stock {
  company: string;
  ticker: string;
  exchange?: string;
  industry?: string;
}
