import { headers } from 'next/headers';
import Link from 'next/link';

import auth from '@/auth';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import UserDropdown from '@/components/UserDropdown/UserDropdown';

import { SearchStocks } from './components';

async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-1 bg-card">
      <div className="mx-auto grid max-w-360 grid-cols-[1fr_13rem_auto] items-center gap-x-4 px-7.5 py-5">
        <Link className="justify-self-start" href="/">
          <Logo color="var(--foreground)" />
        </Link>
        <SearchStocks />
        {session?.user ? (
          <UserDropdown user={session.user} />
        ) : (
          <Button asChild size="sm">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
