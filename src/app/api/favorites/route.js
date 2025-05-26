/**
 * Favorites API
 *
 * This API handles adding, removing, and retrieving favorite exercises for a user.
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';
import UserActivity from '@/lib/db/models/UserActivity';
import { verifyAuth } from '@/lib/auth/auth';

/**
 * GET handler to retrieve all favorite exercises for the authenticated user
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function GET(request) {
  try {
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

    // Return the user's favorite exercises
    return NextResponse.json({
      favorites: user.favoriteExercises || []
    });
  } catch (error) {
    console.error('Error retrieving favorites:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve favorites' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to add an exercise to favorites
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth();
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const { exerciseId, title, category, path, embedUrl } = await request.json();

    // Validate required fields
    if (!exerciseId || !title || !category || !path || !embedUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
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

    // Check if exercise is already in favorites
    const existingFavorite = user.favoriteExercises.find(
      (fav) => fav.exerciseId === exerciseId
    );

    if (existingFavorite) {
      return NextResponse.json(
        { message: 'Exercise already in favorites' },
        { status: 200 }
      );
    }

    // Add exercise to favorites
    user.favoriteExercises.push({
      exerciseId,
      title,
      category,
      path,
      embedUrl,
      addedAt: new Date()
    });

    // Save user
    await user.save();

    // Create activity record
    await UserActivity.create({
      userId: authResult.userId,
      activityType: 'favorite_added',
      title: `Added ${title} to favorites`,
      description: `Added ${category} exercise to favorites`,
      metadata: {
        exerciseTitle: title,
        exerciseCategory: category,
      },
    });

    // Return success response
    return NextResponse.json({
      message: 'Exercise added to favorites',
      favorite: user.favoriteExercises[user.favoriteExercises.length - 1]
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return NextResponse.json(
      { error: 'Failed to add exercise to favorites' },
      { status: 500 }
    );
  }
}
