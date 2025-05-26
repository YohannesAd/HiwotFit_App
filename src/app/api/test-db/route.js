/**
 * Database Connection Test API
 * 
 * This API endpoint tests the MongoDB connection within the Next.js environment
 * to help diagnose connectivity issues.
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('🔍 Testing MongoDB Connection in Next.js environment...');
    
    // Check environment variables
    const mongoUri = process.env.MONGODB_URI;
    console.log('📍 MongoDB URI exists:', !!mongoUri);
    
    if (!mongoUri) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI environment variable not found',
        details: {
          nodeEnv: process.env.NODE_ENV,
          availableEnvVars: Object.keys(process.env).filter(key => 
            key.includes('MONGO') || key.includes('DB')
          )
        }
      }, { status: 500 });
    }

    // Mask sensitive parts for logging
    const maskedUri = mongoUri.replace(/:([^:@]+)@/, ':****@');
    console.log('🔗 Connecting to:', maskedUri);

    // Test connection
    console.log('⏳ Attempting to connect...');
    await dbConnect();
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Connection state:', mongoose.connection.readyState);
    console.log('🏷️  Database name:', mongoose.connection.name);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      details: {
        connectionState: mongoose.connection.readyState,
        databaseName: mongoose.connection.name,
        collections: collections.map(c => c.name),
        nodeEnv: process.env.NODE_ENV
      }
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed in Next.js:');
    console.error('🔍 Error type:', error.name);
    console.error('💬 Error message:', error.message);
    console.error('📚 Full error:', error);
    
    let troubleshooting = [];
    
    if (error.message.includes('ECONNREFUSED')) {
      troubleshooting = [
        'Check if MongoDB Atlas cluster is running (not paused)',
        'Verify your IP address is whitelisted in Network Access',
        'Ensure the connection string is correct',
        'Check if firewall is blocking MongoDB ports'
      ];
    }
    
    if (error.message.includes('authentication failed')) {
      troubleshooting = [
        'Check username and password in connection string',
        'Verify database user has proper permissions',
        'Ensure the database name is correct'
      ];
    }
    
    if (error.message.includes('querySrv')) {
      troubleshooting = [
        'Check internet connection',
        'Try using a different network',
        'DNS resolution issue - try using direct connection string',
        'Check if corporate firewall is blocking DNS queries'
      ];
    }
    
    return NextResponse.json({
      success: false,
      error: error.message,
      errorType: error.name,
      troubleshooting,
      details: {
        nodeEnv: process.env.NODE_ENV,
        mongoUriExists: !!process.env.MONGODB_URI,
        connectionState: mongoose.connection.readyState
      }
    }, { status: 500 });
  }
}
