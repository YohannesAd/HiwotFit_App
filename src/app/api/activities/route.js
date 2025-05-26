/**
 * User Activities API Route
 *
 * This API route handles retrieving user activities for the activity feed.
 * GET: Retrieves all activities for the logged-in user
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import UserActivity from '@/lib/db/models/UserActivity';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * GET handler to retrieve all activities for the logged-in user
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response with user activities
 */
export async function GET(request) {
  try {
    // Get current user from JWT token
    const user = await getCurrentUser();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    const activityType = searchParams.get('type'); // Optional filter by activity type
    const skip = (page - 1) * limit;

    // Build query
    const query = { userId: user.id };
    if (activityType) {
      query.activityType = activityType;
    }

    // Find all activities for the user, sorted by date (newest first)
    const activities = await UserActivity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Get total count for pagination
    const totalCount = await UserActivity.countDocuments(query);

    // Format activities for display
    const formattedActivities = activities.map(activity => ({
      id: activity._id,
      type: activity.activityType,
      title: activity.title,
      description: activity.description,
      date: activity.createdAt,
      metadata: activity.metadata,
      relatedId: activity.relatedId,
      relatedType: activity.relatedType,
    }));

    // Return success response
    return NextResponse.json({
      activities: formattedActivities,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasMore: skip + activities.length < totalCount
      }
    });

  } catch (error) {
    console.error('Error fetching user activities:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error fetching user activities' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to create a new activity record
 * This can be called from other parts of the application
 */
export async function createActivity(userId, activityData) {
  try {
    await dbConnect();
    
    const activity = await UserActivity.create({
      userId,
      ...activityData,
    });
    
    return activity;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
}
