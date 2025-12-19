'use server';

import finnhub from '@/finnhub/api';

import type { SymbolLookup } from '../types';

async function fetchSymbolLookup(query: string) {
  const response = await finnhub<SymbolLookup>(
    `/search?q=${encodeURIComponent(query)}`,
  );

  return response.data;
}

export default fetchSymbolLookup;
