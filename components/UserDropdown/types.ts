import type { CompanyProfile } from '@/finnhub/types';
import type { User } from '@/types';

interface Props {
  popularStocks: CompanyProfile[];
  user: User;
}

export type { Props };
