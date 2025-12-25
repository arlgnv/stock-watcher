import { NextResponse, type NextRequest } from 'next/server';

import type { FieldValues } from '@/app/(auth)/sign-up/_components/Form/types';
import inngest from '@/inngest/client';

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as Omit<
      FieldValues,
      'password' | 'country'
    >;

    await inngest.send({
      name: 'user.signed_up',
      data,
    });

    return new NextResponse(null);
  } catch {
    return new NextResponse(null, { status: 504 });
  }
}
