import { Inngest, EventSchemas } from 'inngest';

// The type argument of the 'fromRecord' method should be a type alias, not an interface.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Events = {
  'app/user.created': {
    data: {
      email: string;
      name: string;
      country: string;
      investmentGoals: string;
      riskTolerance: string;
      preferredIndustry: string;
    };
  };
  'app/send.daily.news': object;
};

export const inngest = new Inngest({
  id: 'signalist',
  ai: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
  schemas: new EventSchemas().fromRecord<Events>(),
});
