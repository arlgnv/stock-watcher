'use server';

import inngest from '@/inngest/client';

import type { FieldValues } from '../types';

async function sendUserSignedUpEvent(
  data: Omit<FieldValues, 'password' | 'country'>,
) {
  return await inngest.send({
    name: 'user.signed_up',
    data,
  });
}

export default sendUserSignedUpEvent;
