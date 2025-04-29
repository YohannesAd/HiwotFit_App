/**
 * MongoDB connection utility
 *
 * This file provides a function to connect to MongoDB and caches the connection
 * to avoid creating multiple connections during development hot reloads.
 */

import mongoose from 'mongoose';

// Check if MongoDB URI is defined in environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  );
}

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
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Create new connection with better error handling
    try {
      console.log('Connecting to MongoDB...');
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw new Error(`Unable to connect to MongoDB: ${error.message}`);
    }
  }

  try {
    // Wait for connection to complete
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`Failed to establish MongoDB connection: ${error.message}`);
  }
}

export default dbConnect;
