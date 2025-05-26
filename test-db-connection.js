/**
 * Database Connection Test Script
 * 
 * This script tests the MongoDB connection to help diagnose connectivity issues.
 * Run this with: node test-db-connection.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 Testing MongoDB Connection...');
console.log('📍 MongoDB URI:', MONGODB_URI ? 'Found' : 'Missing');

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not defined');
  process.exit(1);
}

// Mask sensitive parts of the URI for logging
const maskedURI = MONGODB_URI.replace(/:([^:@]+)@/, ':****@');
console.log('🔗 Connecting to:', maskedURI);

async function testConnection() {
  try {
    console.log('⏳ Attempting to connect...');
    
    // Set connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Connection state:', mongoose.connection.readyState);
    console.log('🏷️  Database name:', mongoose.connection.name);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('🔍 Error type:', error.name);
    console.error('💬 Error message:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 Troubleshooting ECONNREFUSED:');
      console.log('1. Check if MongoDB Atlas cluster is running (not paused)');
      console.log('2. Verify your IP address is whitelisted in Network Access');
      console.log('3. Ensure the connection string is correct');
    }
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 Troubleshooting Authentication:');
      console.log('1. Check username and password in connection string');
      console.log('2. Verify database user has proper permissions');
    }
    
    if (error.message.includes('querySrv')) {
      console.log('\n🔧 Troubleshooting DNS/SRV:');
      console.log('1. Check internet connection');
      console.log('2. Try using a different network');
      console.log('3. Check if firewall is blocking MongoDB ports');
    }
    
  } finally {
    // Close connection
    await mongoose.disconnect();
    console.log('🔌 Connection closed');
    process.exit(0);
  }
}

// Run the test
testConnection();
