'use client';

import { Loader2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/app/_shared/hooks';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';

function SearchCommand({
  renderAs = 'button',
  label = 'Add stock',
  initialStocks,
}: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState(initialStocks);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks.slice(0, 10);

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

  const handleSearch = () => {
    if (!isSearchMode) {
      setStocks(initialStocks);
      return;
    }

    setLoading(true);
    try {
      setStocks([]);
    } catch {
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm('');
    setStocks(initialStocks);
  };

  return (
    <>
      {renderAs === 'text' ? (
        <span
          className="search-text"
          onClick={() => {
            setOpen(true);
          }}
        >
          {label}
        </span>
      ) : (
        <Button
          className="search-btn"
          onClick={() => {
            setOpen(true);
          }}
        >
          {label}
        </Button>
      )}
      <CommandDialog
        className="search-dialog"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="search-field">
          <CommandInput
            className="search-input"
            value={searchTerm}
            placeholder="Search stocks..."
            onValueChange={setSearchTerm}
          />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
            <CommandEmpty className="search-list-empty">
              Loading stocks...
            </CommandEmpty>
          ) : displayStocks.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? 'No results found' : 'No stocks available'}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
                {` `}({displayStocks.length || 0})
              </div>
              {displayStocks.map((stock) => (
                <li className="search-item" key={stock.symbol}>
                  <Link
                    className="search-item-link"
                    href={`/stocks/${stock.symbol}`}
                    onClick={handleSelectStock}
                  >
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="search-item-name">{stock.name}</div>
                      <div className="text-sm text-gray-500">
                        {stock.symbol} | {stock.exchange} | {stock.type}
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
