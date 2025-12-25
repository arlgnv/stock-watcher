import { Inngest, EventSchemas as InngestEventSchemas } from 'inngest';

import type { EventSchemas } from './types';

const client = new Inngest({
  id: 'signalist',
  schemas: new InngestEventSchemas().fromRecord<EventSchemas>(),
  isDev: false,
});

export default client;
