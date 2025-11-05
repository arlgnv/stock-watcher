import mongoose from 'mongoose';

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

let cached = global.mongooseCache;

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  cached ??= global.mongooseCache = { promise: null, conn: null };

  if (cached.conn) {
    return cached.conn;
  }

  cached.promise ??= mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
  });

  try {
    cached.conn = await cached.promise;
    console.log(
      `Connected to database successfully (environment: ${process.env.NODE_ENV})`,
    );
  } catch (error) {
    cached.promise = null;

    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
