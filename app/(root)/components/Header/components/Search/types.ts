import type { FetchPopularCompanyProfilesResponse } from '../../utilities/fetchPopularCompanyProfiles';

export interface Props {
  fetchPopularCompanyProfilesResponse: FetchPopularCompanyProfilesResponse;
}

export interface Stock {
  company: string;
  ticker: string;
  exchange?: string;
  industry?: string;
}
