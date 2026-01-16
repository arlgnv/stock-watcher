import type { Props as ButtonProps } from '../../types';

export interface Props {
  open: boolean;
  fetchPopularCompanyProfilesResponse: ButtonProps['fetchPopularCompanyProfilesResponse'];
  onClose: () => void;
}

export interface Stock {
  company: string;
  ticker: string;
  exchange?: string;
  industry?: string;
}
