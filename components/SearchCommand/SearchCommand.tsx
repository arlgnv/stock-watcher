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

function SearchCommand({ popularCompanyProfiles }: Props) {
  const [open, setOpen] = useState(false);
  const [instantQuery, setInstantQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useDebouncedState(instantQuery, {
    wait: convertSecondsToMilliseconds(1),
  });
  const debouncedQueryIsValid = /\S/.test(debouncedQuery);
  const {
    data: fetchedStocks,
    isFetching: symbolLookupIsBeingFetched,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ['finnhub', 'search', debouncedQuery],
    queryFn: async () => {
      const response = await finnhub<SymbolLookup>(
        `/search?q=${encodeURIComponent(debouncedQuery)}&token=${environment.NEXT_PUBLIC_FINNHUB_API_KEY}`,
      );

      return response.data;
    },
    enabled: debouncedQueryIsValid,
    select(symbolLookup) {
      return symbolLookup.result.map(convertSymbolLookupResultItemToStock);
    },
  });
  const popularStocks = popularCompanyProfiles.map(
    convertCompanyProfileToStock,
  );
  const stocks = debouncedQueryIsValid ? fetchedStocks : popularStocks;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();

        setOpen(!open);
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
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
          {symbolLookupIsBeingFetched && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {/* {stocks?.length } */}
          {symbolLookupIsBeingFetched ? (
            <CommandEmpty className="search-list-empty">
              Stocks are being fetched...
            </CommandEmpty>
          ) : isFetched ? (
            <div className="search-list-indicator">
              {/* {isSearchMode ? 'No results found' : 'No stocks available'} */}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSuccess ? 'Search results' : 'Popular stocks'}
                {/* {` `}({stocks.length}) */}
              </div>
              {stocks?.map(({ ticker, company, exchange, industry }) => (
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
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCommand;
