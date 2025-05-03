/**
 * Login API Route
 *
 * This API route handles user login by validating credentials
 * and returning a JWT token if successful.
 */

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth/jwt';

/**
 * POST handler for user login
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function POST(request) {
  try {
    // Parse request body
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
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
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare provided password with stored hash
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    // If password doesn't match, return error
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    console.log('Login API - Generated token for user:', user.email);

    // Create response with user data
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
      }
    });

    // Set token in cookies directly on the response
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: 'lax'
    });

    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    console.log('Login API - Response prepared with cookie and headers');

    return response;
  } catch (error) {
    console.error('Login error:', error);

    // Return error response
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
