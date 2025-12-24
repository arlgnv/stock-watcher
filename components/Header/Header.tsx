import Image from 'next/image';
import Link from 'next/link';

import NavItems from '../NavItems/NavItems';
import UserDropdown from '../UserDropdown/UserDropdown';
import type { Props } from './types';
import { fetchPopularCompanyProfiles } from './utilities';

async function Header({ user }: Props) {
  const fetchPopularCompanyProfilesResponse =
    await fetchPopularCompanyProfiles();

  return (
    <header className="sticky top-0 header">
      <div className="wrapper header-wrapper">
        <Link href="/">
          <Image
            className="h-8 w-auto cursor-pointer"
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={32}
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems
            fetchPopularCompanyProfilesResponse={
              fetchPopularCompanyProfilesResponse
            }
          />
        </nav>
        <UserDropdown
          user={user}
          fetchPopularCompanyProfilesResponse={
            fetchPopularCompanyProfilesResponse
          }
        />
      </div>
    </header>
  );
}

export default Header;
