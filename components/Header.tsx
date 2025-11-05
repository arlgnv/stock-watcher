import Image from 'next/image';
import Link from 'next/link';

import NavItems from './NavItems';
import UserDropdown from './UserDropdown';

function Header({ user }: { user: User }) {
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
          <NavItems />
        </nav>
        <UserDropdown user={user} />
      </div>
    </header>
  );
}

export default Header;
