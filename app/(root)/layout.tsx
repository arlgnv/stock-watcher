import { Header } from './components';

function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-360 px-7.5 pt-10 pb-12.5">{children}</main>
    </div>
  );
}

export default Layout;
