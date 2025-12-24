import type { User } from '@/types';

import type { FetchPopularCompanyProfilesResponse } from '../Header/utilities/fetchPopularCompanyProfiles';

export interface Props {
  user: User;
  fetchPopularCompanyProfilesResponse: FetchPopularCompanyProfilesResponse;
}
