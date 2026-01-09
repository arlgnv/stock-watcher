import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

import { FINNHUB_API_URL } from '@/constants';
import environment from '@/environment';
import { convertSecondsToMilliseconds } from '@/utilities';

const schema = z.object({
  q: z.string().min(1).max(100),
});

export async function GET(request: NextRequest) {
  const safeParseResult = schema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );

  if (!safeParseResult.success) {
    return NextResponse.json(
      {
        error_code: 'INVALID_QUERY_PARAMETER',
        details: z.prettifyError(safeParseResult.error),
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${FINNHUB_API_URL}/search?q=${encodeURIComponent(safeParseResult.data.q)}`,
      {
        headers: {
          'X-Finnhub-Token': environment.FINNHUB_API_KEY,
        },
        signal: AbortSignal.timeout(convertSecondsToMilliseconds(10)),
      },
    );

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    if (!response.headers.get('Content-Type')?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid response format from Finnhub' },
        { status: 502 },
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return new NextResponse(null, { status: 504 });
  }
}
