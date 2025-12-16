import type { CompanyProfile } from '@/finnhub/types';

interface Props {
  popularStocks: CompanyProfile[];
  renderAs?: 'button' | 'text';
  label?: string;
}

export type { Props };
