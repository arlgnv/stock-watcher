import { NextResponse, type NextRequest } from 'next/server';

import { FINNHUB_API_URL } from '@/constants';
import environment from '@/environment';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${FINNHUB_API_URL}/search?q=${encodeURIComponent(q)}`,
    {
      headers: {
        'X-Finnhub-Token': environment.FINNHUB_API_KEY,
      },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Finnhub' },
      { status: response.status },
    );
  }

  if (!response.headers.get('Content-Type')?.includes('application/json')) {
    return NextResponse.json(
      { error: 'Invalid response format from Finnhub' },
      { status: 502 },
    );
  }

  return NextResponse.json(await response.json());
}
