import type { CompanyProfile } from '@/types';

export interface Props {
  popularCompanyProfiles: CompanyProfile[];
}

export interface SymbolLookup {
  count: number;
  result: {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
  }[];
}

export interface Stock {
  company: string;
  ticker: string;
  exchange?: string;
  industry?: string;
}
