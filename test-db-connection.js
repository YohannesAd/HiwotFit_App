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
console.log('Connection string loaded (credentials hidden).');

async function testConnection() {
  try {
    console.log('⏳ Attempting to connect...');
    
    // Set connection options
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Connection state:', mongoose.connection.readyState);
    console.log('🏷️  Database name:', mongoose.connection.name);
    
    // Test a simple operation
    await mongoose.connection.db.command({ ping: 1 });
    console.log('Database ping succeeded.');
    
  } catch (error) {
    process.exitCode = 1;
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
      console.log('1. In Atlas, check that the cluster exists and resume it if paused');
      console.log('2. Copy Connect > Drivers into MONGODB_URI in .env.local with your database credentials and database name');
      console.log('3. Restart Next.js after changing .env.local, then rerun this check');
    }
    
  } finally {
    // Close connection
    await mongoose.disconnect();
    console.log('🔌 Connection closed');
  }
}

// Run the test
testConnection();
