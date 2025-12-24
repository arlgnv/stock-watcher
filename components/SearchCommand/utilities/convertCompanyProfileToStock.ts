import type { CompanyProfile } from '@/types';

import type { Stock } from '../types';

function convertCompanyProfileToStock(companyProfile: CompanyProfile): Stock {
  return {
    company: companyProfile.name,
    ticker: companyProfile.ticker,
    exchange: companyProfile.exchange,
    industry: companyProfile.finnhubIndustry,
  };
}

export default convertCompanyProfileToStock;
