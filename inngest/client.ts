import { Inngest, EventSchemas } from 'inngest';

// The type argument of the 'fromRecord' method should be a type alias, not an interface.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Events = {
  'app/user.signed_up': {
    data: {
      fullName: string;
      email: string;
      country: string;
      investmentGoal: string;
      riskTolerance: string;
      preferredIndustry: string;
    };
  };
};

const client = new Inngest({
  id: 'signalist',
  schemas: new EventSchemas().fromRecord<Events>(),
});

export default client;
