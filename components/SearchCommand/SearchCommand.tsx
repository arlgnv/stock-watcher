'use client';

import { Loader2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/app/_shared/hooks';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';

import { fetchSymbolLookup } from './actions';
import type { Props } from './types';
import {
  convertCompanyProfileToStock,
  convertSymbolLookupResultItemToStock,
} from './utilities';

function SearchCommand({ popularCompanyProfiles }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const popularStocks = popularCompanyProfiles.map(
    convertCompanyProfileToStock,
  );
  const [stocks, setStocks] = useState(popularStocks);
  const isSearchMode = !!query.trim();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleSearch = async () => {
    if (!isSearchMode) {
      setStocks(popularStocks);
      return;
    }

    setLoading(true);

    try {
      const symbolLookup = await fetchSymbolLookup(query);

      setStocks(symbolLookup.result.map(convertSymbolLookupResultItemToStock));
    } catch {
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [query]);

  const handleSelectStock = () => {
    setOpen(false);
    setQuery('');
    setStocks(popularStocks);
  };

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
            value={query}
            placeholder="Search stocks..."
            onValueChange={setQuery}
          />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
            <CommandEmpty className="search-list-empty">
              Loading stocks...
            </CommandEmpty>
          ) : stocks.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? 'No results found' : 'No stocks available'}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
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
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCommand;
