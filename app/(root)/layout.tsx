import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import auth from '@/auth';
import Header from '@/components/Header/Header';

async function Layout({ children }: LayoutProps<'/'>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <main className="min-h-screen text-gray-400">
      <Header user={session.user} />
      <div className="wrapper py-10">{children}</div>
    </main>
  );
}

export default Layout;
