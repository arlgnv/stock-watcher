import type { CompanyProfile } from '@/types';
import type { User } from '@/types';

export interface Props {
  popularCompanyProfiles: CompanyProfile[];
  user: User;
}
