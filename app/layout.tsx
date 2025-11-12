import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { twJoin } from 'tailwind-merge';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html className="dark" lang="en">
      <body
        className={twJoin(
          geistSans.variable,
          geistMono.variable,
          'antialiased',
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

export { Layout as default, metadata };
