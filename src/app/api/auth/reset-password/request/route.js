/**
 * Password Reset Request API
 * 
 * This API endpoint handles requests to reset a user's password.
 * It generates a verification code and sends it to the user's email.
 */

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { sendEmail } from '@/lib/email/sendEmail';

/**
 * POST handler for password reset requests
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function POST(request) {
  try {
    // Parse request body
    const { email } = await request.json();
    
    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // If user not found, still return success to prevent email enumeration
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json({ 
        message: 'If your email is registered, you will receive a password reset code' 
      });
    }
    
    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration time (15 minutes from now)
    const codeExpiry = new Date();
    codeExpiry.setMinutes(codeExpiry.getMinutes() + 15);
    
    // Update user with verification code and expiry
    user.resetPasswordCode = verificationCode;
    user.resetPasswordExpires = codeExpiry;
    await user.save();
    
    // Send verification code to user's email
    const emailSent = await sendEmail({
      to: email,
      subject: 'Password Reset Verification Code',
      text: `Your password reset verification code is: ${verificationCode}. This code will expire in 15 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e98e0f;">Password Reset</h2>
          <p>You requested a password reset for your Fitness App account.</p>
          <p>Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
            <strong>${verificationCode}</strong>
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
      `
    });
    
    // Return success response
    return NextResponse.json({ 
      message: 'If your email is registered, you will receive a password reset code' 
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
