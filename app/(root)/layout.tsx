import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import auth from '@/auth';
import Header from '@/components/Header';

/**
 * Ensures an authenticated session and renders the page layout containing a Header and the provided children.
 *
 * If no session is present, redirects to '/sign-in'.
 *
 * @param children - The page content to render inside the layout
 * @returns A JSX element containing the Header (populated with the authenticated user) and the children wrapped in the main layout container
 */
async function Layout({ children }: LayoutProps<'/'>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <main className="min-h-screen text-gray-400">
      <Header user={user} />
      <div className="wrapper py-10">{children}</div>
    </main>
  );
}

export default Layout;