'use client';

import { useDebouncedState } from '@tanstack/react-pacer/debouncer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2, Search as SearchIcon, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import type { SymbolLookup } from '@/types';
import { convertSecondsToMilliseconds } from '@/utilities';

import type { Props } from './types';
import {
  convertCompanyProfileToStock,
  convertSymbolLookupResultItemToStock,
} from './utilities';

function Search({ fetchPopularCompanyProfilesResponse }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    queryKey: ['api', 'finnhub', 'search', debouncedQuery],
    queryFn: async () => {
      const response = await axios<SymbolLookup>(
        `/api/finnhub/search?q=${encodeURIComponent(debouncedQuery)}`,
        {
          timeout: convertSecondsToMilliseconds(10),
        },
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
      if (event.key === '/') {
        setModalIsOpen((m) => !m);
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
    setModalIsOpen(false);
    setInstantQuery('');
    setDebouncedQuery('');
  }

  return (
    <>
      <button
        className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-1 rounded-sm bg-input-dark-5/60 px-2.5 py-1.5 text-left text-muted-foreground-dark-5 hover:bg-input-dark-5/70"
        type="button"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <SearchIcon size={16} />
        <span className="text-xs">Search</span>
        <span className="w-5 rounded-xs bg-input text-center text-sm text-muted-foreground">
          /
        </span>
      </button>
      <CommandDialog
        className="search-dialog"
        open={modalIsOpen}
        onOpenChange={setModalIsOpen}
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
                  <>
                    <div className="search-count">
                      {modeIsPopular ? 'Popular stocks' : 'Search results'}
                      {` `}({stocks.length})
                    </div>
                    <ul>
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
                  </>
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

export default Search;
