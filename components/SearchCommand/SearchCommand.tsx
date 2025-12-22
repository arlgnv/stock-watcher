'use client';

import { useDebouncedState } from '@tanstack/react-pacer/debouncer';
import { useQuery } from '@tanstack/react-query';
import { Loader2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import environment from '@/environment';
import finnhub from '@/finnhub/api';
import { convertSecondsToMilliseconds } from '@/utilities';

import type { Props, SymbolLookup } from './types';
import {
  convertCompanyProfileToStock,
  convertSymbolLookupResultItemToStock,
} from './utilities';

function SearchCommand({ fetchPopularCompanyProfilesResponse }: Props) {
  const [open, setOpen] = useState(false);
  const [instantQuery, setInstantQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useDebouncedState(instantQuery, {
    wait: convertSecondsToMilliseconds(1),
  });
  const mode = debouncedQuery ? 'search' : 'popular';
  const modeIsPopular = mode === 'popular';
  const {
    data: fetchedStocks,
    isFetching: symbolLookupIsBeingFetched,
    isError: fetchSymbolLookupFailed,
  } = useQuery({
    queryKey: ['finnhub', 'search', debouncedQuery],
    queryFn: async () => {
      const response = await finnhub<SymbolLookup>(
        `/search?q=${encodeURIComponent(debouncedQuery)}&token=${environment.NEXT_PUBLIC_FINNHUB_API_KEY}`,
      );

      return response.data;
    },
    enabled: !modeIsPopular,
    select(symbolLookup) {
      return symbolLookup.result.map(convertSymbolLookupResultItemToStock);
    },
  });
  const stocksAreBeingFetched = modeIsPopular
    ? false
    : symbolLookupIsBeingFetched;
  const stocks = modeIsPopular
    ? fetchPopularCompanyProfilesResponse.status === 'success'
      ? fetchPopularCompanyProfilesResponse.data.map(
          convertCompanyProfileToStock,
        )
      : undefined
    : fetchedStocks;
  const fetchStocksFailed = modeIsPopular
    ? fetchPopularCompanyProfilesResponse.status === 'error'
    : fetchSymbolLookupFailed;

  useEffect(() => {
    function handleWindowKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();

        setOpen((o) => !o);
      }
    }

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);

  function handleInputChange(value: string) {
    setInstantQuery(value);
    setDebouncedQuery(value);
  }

  function handleSelectStock() {
    setOpen(false);
    setInstantQuery('');
    setDebouncedQuery('');
  }

  return (
    <>
      <button
        className="hover:text-yellow-500"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Search
      </button>
      <CommandDialog
        className="search-dialog"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="search-field">
          <CommandInput
            className="search-input"
            value={instantQuery}
            placeholder="Search stocks..."
            onValueChange={handleInputChange}
          />
        </div>
        <CommandList className="search-list">
          {stocksAreBeingFetched ? (
            <div className="px-3 py-2">
              <Loader2 className="mx-auto animate-spin text-gray-500" />
            </div>
          ) : (
            <>
              {stocks &&
                (stocks.length ? (
                  <ul>
                    <div className="search-count">
                      {modeIsPopular ? 'Popular stocks' : 'Search results'}
                      {` `}({stocks.length})
                    </div>
                    {stocks.map(({ ticker, company, exchange, industry }) => (
                      <li className="search-item" key={ticker}>
                        <Link
                          className="search-item-link"
                          href={`/stocks/${ticker}`}
                          onClick={handleSelectStock}
                        >
                          <TrendingUp className="h-4 w-4 text-gray-500" />
                          <div className="flex-1">
                            <div className="search-item-name">{company}</div>
                            <div className="text-sm text-gray-500">
                              {`${ticker}${exchange ? ` • ${exchange}` : ''}${industry ? ` • ${industry}` : ''}`}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <CommandEmpty className="px-3 py-2 text-center text-gray-500">
                    {modeIsPopular ? 'No popular stocks' : 'No stocks found'}
                  </CommandEmpty>
                ))}
              {fetchStocksFailed && (
                <p className="px-3 py-2 text-destructive">
                  {modeIsPopular
                    ? 'An error occurred while fetching popular stocks'
                    : 'An error occurred while searching for stocks'}
                </p>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCommand;
