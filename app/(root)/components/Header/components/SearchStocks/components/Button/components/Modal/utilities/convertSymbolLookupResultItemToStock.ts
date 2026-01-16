import type { SymbolLookup } from '@/types';

import type { Stock } from '../types';

function convertSymbolLookupResultItemToStock(
  symbolLookupResultItem: SymbolLookup['result'][number],
): Stock {
  return {
    company: symbolLookupResultItem.description,
    ticker: symbolLookupResultItem.displaySymbol,
  };
}

export default convertSymbolLookupResultItemToStock;
