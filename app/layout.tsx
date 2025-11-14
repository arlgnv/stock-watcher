import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { twJoin } from 'tailwind-merge';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const metadata: Metadata = {
  title: {
    template: '%s · Signalist',
    default: 'Signalist',
  },
  description:
    'Track real-time stock prices, get personalized alerts, and explore detailed company insights.',
  generator: 'Next.js',
  applicationName: 'Signalist',
};

function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      className={twJoin(GeistSans.variable, 'dark font-geist antialiased')}
      lang="en"
    >
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

export { Layout as default, metadata };
