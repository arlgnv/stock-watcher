import { toNextJsHandler } from 'better-auth/next-js';

import auth from '@/auth';

const { GET, POST } = toNextJsHandler(auth);

export { GET, POST };
