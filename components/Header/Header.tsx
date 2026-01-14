import { headers } from 'next/headers';
import Link from 'next/link';

import auth from '@/auth';

import Logo from '../Logo';
import UserDropdown from '../UserDropdown/UserDropdown';
import { fetchPopularCompanyProfiles } from './utilities';

async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const fetchPopularCompanyProfilesResponse =
    await fetchPopularCompanyProfiles();

  console.log(fetchPopularCompanyProfilesResponse);

  return (
    <header className="sticky top-0 z-1 bg-gray-800">
      <div className="mx-auto grid max-w-360 grid-cols-[1fr_13rem_auto_auto] items-center gap-x-4 px-7.5 py-5">
        <Link href="/">
          <Logo />
        </Link>
        <div>stocks search</div>
        <div>app's settings</div>
        {session?.user ? (
          <UserDropdown user={session.user} />
        ) : (
          <Link
            className="rounded-md bg-linear-to-b from-yellow-400 to-yellow-500 px-3 py-1 text-sm font-medium text-gray-950 hover:from-yellow-500 hover:to-yellow-400"
            href="/sign-in"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
