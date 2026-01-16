import type fetchPopularCompanyProfiles from '../../utilities/fetchPopularCompanyProfiles';

export interface Props {
  fetchPopularCompanyProfilesResponse: Awaited<
    ReturnType<typeof fetchPopularCompanyProfiles>
  >;
}
