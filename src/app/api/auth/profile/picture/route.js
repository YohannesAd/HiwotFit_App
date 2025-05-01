/**
 * Profile Picture API Route
 * 
 * This API route handles uploading and updating the user's profile picture.
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * PUT handler to update user profile picture
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function PUT(request) {
  try {
    // Get current user from JWT token
    const currentUser = await getCurrentUser();
    
    // Check if user is authenticated
    if (!currentUser) {
      console.log('Profile Picture API - No authenticated user found');
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
    
    // Connect to the database
    await dbConnect();
    
    // Find user by ID
    const user = await User.findById(currentUser.id);
    
    // If user not found, return error
    if (!user) {
      console.log('Profile Picture API - User not found in database for ID:', currentUser.id);
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
    
    // Update user profile picture
    if (data.profilePicture !== undefined) {
      user.profilePicture = data.profilePicture;
    }
    
    // Save updated user
    await user.save();
    
    console.log('Profile Picture API - User profile picture updated:', user.email);
    
    // Create response with updated user data
    const response = NextResponse.json({
      message: 'Profile picture updated successfully',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture
      }
    });
    
    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    
    return response;
  } catch (error) {
    console.error('Profile picture update error:', error);
    
    // Return error response with no-cache headers
    const response = NextResponse.json(
      { error: 'An error occurred while updating profile picture' },
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
