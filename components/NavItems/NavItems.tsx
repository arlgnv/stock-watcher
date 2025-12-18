'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

import { NAVIGATION_LINKS } from '@/app/_shared/constants';

import SearchCommand from '../SearchCommand/SearchCommand';
import type { Props } from './types';

function NavItems({ popularCompanyProfiles }: Props) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-3 p-2 font-medium sm:flex-row sm:gap-10">
      {NAVIGATION_LINKS.map(({ href, text }) => {
        if (text === 'Search') {
          return (
            <li key="search-trigger">
              <SearchCommand
                label="Search"
                popularCompanyProfiles={popularCompanyProfiles}
              />
            </li>
          );
        }

        return (
          <li key={href}>
            <Link
              className={twJoin(
                'transition-colors hover:text-yellow-500',
                href === pathname && 'text-gray-100',
              )}
              href={href}
            >
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavItems;
