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

cached ??= global.mongooseCache = { conn: null, promise: null };

async function connectToDatabase() {
  if (!cached) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env',
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  cached.promise ??= mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
  });

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;

    throw error;
  }

  console.log(
    `Connected to database ${process.env.NODE_ENV} ${process.env.MONGODB_URI}`,
  );

  return cached.conn;
}

export default connectToDatabase;
