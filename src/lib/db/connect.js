/**
 * MongoDB connection utility
 *
 * This file provides a function to connect to MongoDB and caches the connection
 * to avoid creating multiple connections during development hot reloads.
 */

import mongoose from 'mongoose';

// Cache the MongoDB connection to avoid creating multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB
 * @returns {Promise<Mongoose>} Mongoose connection
 */
async function dbConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  try {
    // Share in-flight connections, but allow a new attempt after a failure.
    if (!cached.promise) {
      cached.promise = mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
      });
    }

    // Wait for connection to complete
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
    return cached.conn;
  } catch (error) {
    cached.conn = null;
    cached.promise = null;
    const dnsFailure = /querySrv|ENOTFOUND|ENODATA/.test(error.message);
    throw new Error(
      dnsFailure
        ? 'MongoDB DNS lookup failed. Check that the Atlas cluster is active and MONGODB_URI matches its current connection string.'
        : 'Failed to establish MongoDB connection. Check database availability, credentials, and network access.',
      { cause: error }
    );
  }
}

export default dbConnect;
