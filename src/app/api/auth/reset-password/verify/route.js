/**
 * Verification Code API
 * 
 * This API endpoint verifies the code sent to the user's email
 * for password reset.
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import jwt from 'jsonwebtoken';

// JWT secret key for reset tokens
const RESET_TOKEN_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * POST handler for verification code validation
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function POST(request) {
  try {
    // Parse request body
    const { email, code } = await request.json();
    
    // Validate required fields
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // If user not found, return error
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or verification code' },
        { status: 400 }
      );
    }
    
    // Check if verification code exists and is valid
    if (!user.resetPasswordCode || user.resetPasswordCode !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }
    
    // Check if verification code has expired
    if (user.resetPasswordExpires && new Date() > new Date(user.resetPasswordExpires)) {
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }
    
    // Generate a reset token that will be used for the actual password reset
    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      RESET_TOKEN_SECRET,
      { expiresIn: '15m' } // Token expires in 15 minutes
    );
    
    // Return success response with reset token
    return NextResponse.json({ 
      message: 'Verification successful',
      resetToken 
    });
  } catch (error) {
    console.error('Verification code error:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'An error occurred while verifying the code' },
      { status: 500 }
    );
  }
}
