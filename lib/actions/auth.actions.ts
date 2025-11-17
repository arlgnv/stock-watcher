'use server';

import { headers } from 'next/headers';

import auth from '@/auth';

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return true;
  } catch (error) {
    console.error('Sign in failed', error);

    return false;
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });

    return true;
  } catch (error) {
    console.error('Sign out failed', error);

    return false;
  }
};
