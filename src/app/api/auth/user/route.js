/**
 * User API Route
 *
 * This API route returns the current authenticated user.
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * GET handler to retrieve the current user
 * @returns {NextResponse} - The API response with user data
 */
export async function GET() {
  try {
    // Get current user from token
    const currentUser = await getCurrentUser();

    // If no user is authenticated, return null with no-cache headers
    if (!currentUser) {
      console.log('User API - No authenticated user found');
      const response = NextResponse.json({ user: null });

      // Set cache control headers
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');

      return response;
    }

    // Connect to the database
    await dbConnect();

    // Find user by ID to get the latest data
    const user = await User.findById(currentUser.id).select('-password');

    // If user not found, return null with no-cache headers
    if (!user) {
      console.log('User API - User not found in database for ID:', currentUser.id);
      const response = NextResponse.json({ user: null });

      // Set cache control headers
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');

      return response;
    }

    // Log user data before sending response
    console.log('User API - User data from database:', {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      hasPicture: user.profilePicture ? `length: ${user.profilePicture.length}` : 'none'
    });

    // Create response with user data
    const response = NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
      }
    });

    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    console.log('User API - Returning user data for:', user.email);

    return response;
  } catch (error) {
    console.error('Get user error:', error);

    // Return error response with no-cache headers
    const response = NextResponse.json(
      { error: 'An error occurred while fetching user data', user: null },
      { status: 500 }
    );

    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  }
}
