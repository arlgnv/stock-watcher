import { Button } from './components';
import { fetchPopularCompanyProfiles } from './utilities';

async function SearchStocks() {
  const fetchPopularCompanyProfilesResponse =
    await fetchPopularCompanyProfiles();

  return (
    <Button
      fetchPopularCompanyProfilesResponse={fetchPopularCompanyProfilesResponse}
    />
  );
}

export default SearchStocks;
