import type { GetEvents } from 'inngest';

import type { MarketNews } from '@/finnhub/types';

import type inngest from './client';

// The type argument of the 'fromRecord' method should be a type alias, not an interface.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type EventSchemas = {
  'user.signed_up': {
    data: {
      fullName: string;
      email: string;
      investmentGoal: string;
      riskTolerance: string;
      preferredIndustry: string;
    };
  };
  'daily_market_news.prepared': {
    data: {
      userEmail: string;
      marketNews: MarketNews[];
    };
  };
};

type Events = GetEvents<typeof inngest>;

export type DailyMarketNewsPreparedEvent = Events['daily_market_news.prepared'];
