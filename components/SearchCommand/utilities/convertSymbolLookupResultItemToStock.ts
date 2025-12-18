import type { SymbolLookup, Stock } from '../types';

function convertSymbolLookupResultItemToStock(
  symbolLookupResultItem: SymbolLookup['result'][number],
): Stock {
  return {
    company: symbolLookupResultItem.description,
    ticker: symbolLookupResultItem.displaySymbol,
  };
}

export default convertSymbolLookupResultItemToStock;
