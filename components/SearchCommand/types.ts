import type { CompanyProfile } from '@/types';

interface Props {
  popularStocks: CompanyProfile[];
  renderAs?: 'button' | 'text';
  label?: string;
}

export type { Props };
