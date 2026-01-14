import { headers } from 'next/headers';

import auth from '@/auth';
import Header from '@/components/Header/Header';

async function Layout({ children }: LayoutProps<'/'>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen">
      <Header user={session?.user} />
      <div className="wrapper py-10">{children}</div>
    </main>
  );
}

export default Layout;
