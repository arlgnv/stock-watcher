import Image from 'next/image';
import Link from 'next/link';

import { searchStocks } from '@/lib/actions/finnhub.actions';

import NavItems from './NavItems';
import UserDropdown from './UserDropdown';

async function Header({ user }: { user: User }) {
  const initialStocks = await searchStocks();

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
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
}

export default Header;
