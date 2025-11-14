import type { Metadata } from 'next';

import FooterLink from '@/components/FooterLink';

import { Form } from './_components';

const metadata: Metadata = {
  title: 'Sign up',
};

function Page() {
  return (
    <>
      <h1 className="form-title">Sign up for Signalist</h1>
      <Form />
      <FooterLink
        text="Already have an account?"
        linkText="Sign in"
        href="/sign-in"
      />
    </>
  );
}

export { Page as default, metadata };
