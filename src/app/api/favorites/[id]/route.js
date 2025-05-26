/**
 * Favorites API - Single Exercise
 *
 * This API handles operations on a specific favorite exercise.
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import UserActivity from '@/lib/db/models/UserActivity';
import { verifyAuth } from '@/lib/auth/auth';

/**
 * DELETE handler to remove an exercise from favorites
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters
 * @returns {NextResponse} - The API response
 */
export async function DELETE(request, { params }) {
  try {
    // Get exercise ID from route parameters
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Exercise ID is required' },
        { status: 400 }
      );
    }

    // Verify authentication
    const authResult = await verifyAuth();
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Get user from database
    const user = await User.findById(authResult.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if exercise is in favorites
    const favoriteIndex = user.favoriteExercises.findIndex(
      (fav) => fav.exerciseId === id
    );

    if (favoriteIndex === -1) {
      return NextResponse.json(
        { error: 'Exercise not found in favorites' },
        { status: 404 }
      );
    }

    // Get the favorite exercise details before removing
    const removedFavorite = user.favoriteExercises[favoriteIndex];

    // Remove exercise from favorites
    user.favoriteExercises.splice(favoriteIndex, 1);

    // Save user
    await user.save();

    // Create activity record
    await UserActivity.create({
      userId: authResult.userId,
      activityType: 'favorite_removed',
      title: `Removed ${removedFavorite.title} from favorites`,
      description: `Removed ${removedFavorite.category} exercise from favorites`,
      metadata: {
        exerciseTitle: removedFavorite.title,
        exerciseCategory: removedFavorite.category,
      },
    });

    // Return success response
    return NextResponse.json({
      message: 'Exercise removed from favorites'
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return NextResponse.json(
      { error: 'Failed to remove exercise from favorites' },
      { status: 500 }
    );
  }
}
