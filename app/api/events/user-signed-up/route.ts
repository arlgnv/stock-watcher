import { headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import auth from '@/auth';
import inngest from '@/inngest/client';

const schema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.email(),
  investmentGoal: z.literal([
    'Growth',
    'Income',
    'Balanced',
    'Aggressive',
    'Conservative',
  ]),
  riskTolerance: z.literal(['Low', 'Medium', 'High']),
  preferredIndustry: z.literal([
    'Technology',
    'Healthcare',
    'Finance',
    'Energy',
    'Consumer Goods',
  ]),
});

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { error_code: 'INVALID_REQUEST_BODY_FORMAT' },
      { status: 400 },
    );
  }

  const safeParseResult = schema.safeParse(requestBody);

  if (!safeParseResult.success) {
    return NextResponse.json(
      {
        error_code: 'INVALID_DATA',
        details: z.prettifyError(safeParseResult.error),
      },
      { status: 400 },
    );
  }

  try {
    await inngest.send({
      name: 'user.signed_up',
      data: safeParseResult.data,
    });
  } catch {
    return new NextResponse(null, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
