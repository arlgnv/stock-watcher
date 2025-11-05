import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import auth from '@/auth';

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect('/');
  }

  return (
    <main className="auth-layout">
      <section className="scrollbar-hide-default auth-left-section">
        <Link className="auth-logo" href="/">
          <Image
            className="h-8 w-auto"
            src="/assets/icons/logo.svg"
            alt="Signalist Logo"
            width={140}
            height={32}
          />
        </Link>
        <div className="flex-1 pb-6 lg:pb-8">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="relative z-10 lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Signalist turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex items-center justify-between">
            <cite className="auth-testimonial-author">- Ethan R.</cite>
            <p className="text-gray-500 max-md:text-xs">Retail Investor</p>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  className="size-5"
                  key={star}
                  src="/assets/icons/star.svg"
                  alt="Star"
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative flex-1">
          <Image
            className="absolute top-0 auth-dashboard-preview"
            src="/assets/images/dashboard.png"
            alt="Dashboard Preview"
            width={1440}
            height={1150}
          />
        </div>
      </section>
    </main>
  );
}

export default Layout;
