/**
 * Profile API Route
 *
 * This API route handles updating the user's profile information.
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * PUT handler to update user profile
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function PUT(request) {
  try {
    // Get current user from JWT token
    const currentUser = await getCurrentUser();

    // Check if user is authenticated
    if (!currentUser) {
      console.log('Profile API - No authenticated user found');
      const response = NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );

      // Set cache control headers
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');

      return response;
    }

    // Parse request body
    const data = await request.json();
    console.log('Profile API - Request data received:', {
      hasName: !!data.name,
      hasUsername: !!data.username,
      hasProfilePicture: !!data.profilePicture,
      profilePictureLength: data.profilePicture ? data.profilePicture.length : 0
    });

    // Connect to the database
    await dbConnect();

    // Find user by ID
    const user = await User.findById(currentUser.id);

    // If user not found, return error
    if (!user) {
      console.log('Profile API - User not found in database for ID:', currentUser.id);
      const response = NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );

      // Set cache control headers
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');

      return response;
    }

    // Update user fields
    if (data.name) user.name = data.name;
    if (data.username) user.username = data.username;

    // Handle profile picture update
    if (data.profilePicture) {
      console.log('Profile API - Updating profile picture, length:', data.profilePicture.length);
      user.profilePicture = data.profilePicture;
      console.log('Profile API - Profile picture set on user object');
    } else {
      console.log('Profile API - No profile picture provided');
    }

    // Save updated user
    console.log('Profile API - Saving user to database...');
    await user.save();
    console.log('Profile API - User saved successfully');

    console.log('Profile API - User profile updated:', {
      email: user.email,
      hasPicture: user.profilePicture ? `length: ${user.profilePicture.length}` : 'none'
    });

    // Create response with updated user data
    const response = NextResponse.json({
      message: 'Profile updated successfully',
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

    return response;
  } catch (error) {
    console.error('Profile update error:', error);

    // Return error response with no-cache headers
    const response = NextResponse.json(
      { error: 'An error occurred while updating profile' },
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
