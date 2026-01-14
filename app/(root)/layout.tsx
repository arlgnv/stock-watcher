import Header from '@/components/Header/Header';

function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="mx-auto max-w-360 px-7.5 pt-10 pb-12.5">{children}</main>
    </div>
  );
}

export default Layout;
