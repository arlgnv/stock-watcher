import Header from '@/components/Header';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="wrapper py-10">{children}</div>
    </main>
  );
}

export default Layout;
