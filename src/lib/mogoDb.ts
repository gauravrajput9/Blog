import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<Mongoose> {
  const cache = globalWithMongoose.mongooseCache!;

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const opts = { bufferCommands: false };

    cache.promise = mongoose.connect(MONGODB_URI, opts);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
