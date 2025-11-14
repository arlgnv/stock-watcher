import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';

import connectToDatabase from '@/database/mongoose';

const authInstance: ReturnType<typeof betterAuth> | null = null;

async function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  const mongoose = await connectToDatabase();
  const database = mongoose.connection.db;

  if (!database) {
    console.error('Database connection is not established');
    // throw new Error('Database connection is not established');
  }

  const auth = betterAuth({
    database: database ? mongodbAdapter(database) : undefined,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [nextCookies()],
  });

  return auth;
}

const auth = await getAuth();

export default auth;
