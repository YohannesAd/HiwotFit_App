/**
 * Workout Sessions API Route
 *
 * This API route handles creating and retrieving workout sessions.
 * GET: Retrieves all workout sessions for the logged-in user
 * POST: Creates a new workout session
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import WorkoutSession from '@/lib/db/models/WorkoutSession';
import UserActivity from '@/lib/db/models/UserActivity';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * GET handler to retrieve all workout sessions for the logged-in user
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response with workout sessions
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

    // Convert user.id to ObjectId for proper matching
    const mongoose = require('mongoose');
    const userObjectId = new mongoose.Types.ObjectId(user.id);

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    // Find all workout sessions for the user, sorted by date (newest first)
    const workouts = await WorkoutSession.find({
      userId: userObjectId
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

    // Get total count for pagination
    const totalCount = await WorkoutSession.countDocuments({
      userId: userObjectId
    });

    // Return success response
    return NextResponse.json({
      workouts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasMore: skip + workouts.length < totalCount
      }
    });

  } catch (error) {
    console.error('Error fetching workout sessions:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error fetching workout sessions' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new workout session
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response with the created workout session
 */
export async function POST(request) {
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

    // Parse request body
    const data = await request.json();

    // Validate required data
    if (!data.name || !data.primaryMuscleGroup || !data.startTime || !data.endTime) {
      return NextResponse.json(
        { error: 'Missing required fields: name, primaryMuscleGroup, startTime, endTime' },
        { status: 400 }
      );
    }

    // Calculate duration
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);
    const duration = Math.round((endTime - startTime) / (1000 * 60)); // in minutes

    if (duration <= 0) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Convert user.id to ObjectId for proper storage
    const mongoose = require('mongoose');
    const userObjectId = new mongoose.Types.ObjectId(user.id);

    console.log('Creating workout for user:', user.id, 'as ObjectId:', userObjectId);

    // Create new workout session
    const workoutSession = await WorkoutSession.create({
      userId: userObjectId,
      name: data.name,
      primaryMuscleGroup: data.primaryMuscleGroup,
      exercises: data.exercises || [],
      startTime,
      endTime,
      duration,
      caloriesBurned: data.caloriesBurned || 0,
      notes: data.notes || '',
      completed: data.completed !== undefined ? data.completed : true,
    });

    console.log('Created workout session:', workoutSession._id, 'duration:', duration);

    // Create activity record
    await UserActivity.create({
      userId: user.id,
      activityType: 'workout_completed',
      title: `Completed ${data.name}`,
      description: `Finished a ${duration}-minute ${data.primaryMuscleGroup} workout`,
      relatedId: workoutSession._id,
      relatedType: 'WorkoutSession',
      metadata: {
        workoutName: data.name,
        primaryMuscleGroup: data.primaryMuscleGroup,
        duration,
        caloriesBurned: data.caloriesBurned || 0,
        exerciseCount: data.exercises ? data.exercises.length : 0,
        notes: data.notes || '', // Include notes in metadata
      },
    });

    // Return success response
    return NextResponse.json(
      {
        message: 'Workout session saved successfully',
        workout: workoutSession
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error saving workout session:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error saving workout session' },
      { status: 500 }
    );
  }
}
