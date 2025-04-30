/**
 * Password Reset API
 * 
 * This API endpoint handles the actual password reset after
 * the user has verified their identity with a verification code.
 */

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';

// JWT secret key for reset tokens
const RESET_TOKEN_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * POST handler for password reset
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function POST(request) {
  try {
    // Parse request body
    const { resetToken, newPassword } = await request.json();
    
    // Validate required fields
    if (!resetToken || !newPassword) {
      return NextResponse.json(
        { error: 'Reset token and new password are required' },
        { status: 400 }
      );
    }
    
    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Verify reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, RESET_TOKEN_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find user by ID from token
    const user = await User.findById(decoded.userId);
    
    // If user not found, return error
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update user's password
    user.password = hashedPassword;
    
    // Clear reset password fields
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    
    // Save the updated user
    await user.save();
    
    // Return success response
    return NextResponse.json({ 
      message: 'Password has been reset successfully' 
    });
  } catch (error) {
    console.error('Password reset error:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
}
