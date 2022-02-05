import dotenv from 'dotenv'
dotenv.config()

import { MongoClient, Db } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the URI in .env.local'
    )
}

if(!MONGODB_DB) {
    throw new Error(
        'Please define the DB in .env.local'
    )
}

/**
 *  Global here for cached connection across hot reloads
 */

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

 
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// export { connectToDatabase };
