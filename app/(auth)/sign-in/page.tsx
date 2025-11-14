import type { Metadata } from 'next';

import FooterLink from '@/components/FooterLink';

import { Form } from './_components';

const metadata: Metadata = {
  title: 'Sign in',
};

function Page() {
  return (
    <>
      <h1 className="form-title">Sign in to Signalist</h1>
      <Form />
      <FooterLink text="New to Signalist?" linkText="Sign up" href="/sign-up" />
    </>
  );
}

export { Page as default, metadata };
