import Image from 'next/image';
import Link from 'next/link';

import NavItems from '../NavItems/NavItems';
import UserDropdown from '../UserDropdown/UserDropdown';
import type { Props } from './types';
import { fetchPopularStocks } from './utilities';

async function Header({ user }: Props) {
  const popularStocks = await fetchPopularStocks();

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
          <NavItems popularStocks={popularStocks} />
        </nav>
        <UserDropdown user={user} popularStocks={popularStocks} />
      </div>
    </header>
  );
}

export default Header;
