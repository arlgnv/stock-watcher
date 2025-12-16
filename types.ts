import type auth from './auth';

type User = typeof auth.$Infer.Session.user;

export type { User };
