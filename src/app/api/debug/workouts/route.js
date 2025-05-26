/**
 * Debug API for Workouts
 * 
 * This API helps debug workout data issues
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import WorkoutSession from '@/lib/db/models/WorkoutSession';
import { getCurrentUser } from '@/lib/auth/jwt';

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

    // Get all workouts for debugging
    const allWorkouts = await WorkoutSession.find({}).limit(10);
    
    // Get workouts with string userId
    const workoutsWithStringUserId = await WorkoutSession.find({
      userId: user.id
    });

    // Get workouts with ObjectId userId
    const mongoose = require('mongoose');
    const userObjectId = new mongoose.Types.ObjectId(user.id);
    const workoutsWithObjectId = await WorkoutSession.find({
      userId: userObjectId
    });

    // Aggregate total time with string userId
    const totalTimeString = await WorkoutSession.aggregate([
      { $match: { userId: user.id } },
      { $group: { _id: null, totalDuration: { $sum: '$duration' } } }
    ]);

    // Aggregate total time with ObjectId userId
    const totalTimeObjectId = await WorkoutSession.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalDuration: { $sum: '$duration' } } }
    ]);

    return NextResponse.json({
      debug: {
        currentUserId: user.id,
        currentUserIdType: typeof user.id,
        userObjectId: userObjectId.toString(),
        allWorkoutsCount: allWorkouts.length,
        allWorkouts: allWorkouts.map(w => ({
          id: w._id,
          userId: w.userId,
          userIdType: typeof w.userId,
          name: w.name,
          duration: w.duration
        })),
        workoutsWithStringUserId: {
          count: workoutsWithStringUserId.length,
          workouts: workoutsWithStringUserId.map(w => ({
            id: w._id,
            name: w.name,
            duration: w.duration
          }))
        },
        workoutsWithObjectId: {
          count: workoutsWithObjectId.length,
          workouts: workoutsWithObjectId.map(w => ({
            id: w._id,
            name: w.name,
            duration: w.duration
          }))
        },
        totalTimeString: totalTimeString,
        totalTimeObjectId: totalTimeObjectId
      }
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Debug API error', details: error.message },
      { status: 500 }
    );
  }
}
