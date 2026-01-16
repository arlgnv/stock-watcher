import { useDebouncedState } from '@tanstack/react-pacer/debouncer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandLoading,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import type { SymbolLookup } from '@/types';
import { convertSecondsToMilliseconds } from '@/utilities';

import type { Props } from './types';
import {
  convertSymbolLookupResultItemToStock,
  convertCompanyProfileToStock,
} from './utilities';

function Modal({ open, fetchPopularCompanyProfilesResponse, onClose }: Props) {
  const [instantQuery, setInstantQuery] = useState('');
  const router = useRouter();
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

  function handleInputChange(value: string) {
    setInstantQuery(value);
    setDebouncedQuery(value);
  }

  function createStockSelectHandler(ticker: string) {
    return () => {
      onClose();
      setInstantQuery('');
      setDebouncedQuery('');
      router.push(`/stocks/${ticker}`);
    };
  }

  return (
    <CommandDialog
      open={open}
      title="Stocks search modal"
      description="A modal for searching stocks and viewing popular stocks"
      commandProps={{
        shouldFilter: false,
        loop: true,
      }}
      onOpenChange={onClose}
    >
      <CommandInput
        value={instantQuery}
        placeholder="Search stocks..."
        onValueChange={handleInputChange}
      />
      <CommandList>
        {stocksAreBeingFetched ? (
          <CommandLoading>
            <Loader2 className="mx-auto animate-spin" />
          </CommandLoading>
        ) : (
          <>
            {stocks &&
              (stocks.length ? (
                <CommandGroup
                  heading={`${modeIsPopular ? 'Popular stocks' : 'Search results'} (${String(stocks.length)})`}
                  forceMount
                >
                  {stocks.map(({ ticker, company, exchange, industry }) => (
                    <CommandItem
                      key={ticker}
                      className="grid grid-cols-[auto_1fr] grid-rows-2 gap-y-1"
                      onSelect={createStockSelectHandler(ticker)}
                    >
                      <TrendingUp />
                      <p>{company}</p>
                      <p className="col-start-2 text-muted-foreground">
                        {`${ticker}${exchange ? ` • ${exchange}` : ''}${industry ? ` • ${industry}` : ''}`}
                      </p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>
                  {modeIsPopular ? 'No popular stocks' : 'No stocks found'}
                </CommandEmpty>
              ))}
            {fetchStocksFailed && (
              <p className="px-3 py-6 text-center text-destructive">
                An error occurred while{' '}
                {modeIsPopular
                  ? 'fetching popular stocks'
                  : 'searching for stocks'}
              </p>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export default Modal;
