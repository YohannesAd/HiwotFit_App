/**
 * User Statistics API Route
 *
 * This API route handles retrieving user statistics for the home page.
 * GET: Retrieves comprehensive stats for the logged-in user
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import WorkoutSession from '@/lib/db/models/WorkoutSession';
import CalorieCalculation from '@/lib/db/models/CalorieCalculation';
import User from '@/lib/db/models/User';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * GET handler to retrieve comprehensive statistics for the logged-in user
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response with user statistics
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

    // Get user data for favorites count
    const userData = await User.findById(user.id);
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate date ranges
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Convert user.id to ObjectId for proper matching
    const mongoose = require('mongoose');
    const userObjectId = new mongoose.Types.ObjectId(user.id);

    console.log('Stats API - User ID:', user.id);
    console.log('Stats API - User ObjectId:', userObjectId);

    // Get workout statistics
    const [
      totalWorkouts,
      weeklyWorkouts,
      monthlyWorkouts,
      totalWorkoutTime,
      totalCaloriesBurned,
      workoutsByMuscleGroup
    ] = await Promise.all([
      // Total workouts
      WorkoutSession.countDocuments({ userId: userObjectId }),

      // Weekly workouts
      WorkoutSession.countDocuments({
        userId: userObjectId,
        createdAt: { $gte: startOfWeek }
      }),

      // Monthly workouts
      WorkoutSession.countDocuments({
        userId: userObjectId,
        createdAt: { $gte: startOfMonth }
      }),

      // Total workout time
      WorkoutSession.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, totalDuration: { $sum: '$duration' } } }
      ]),

      // Total calories burned
      WorkoutSession.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, totalCalories: { $sum: '$caloriesBurned' } } }
      ]),

      // Workouts by muscle group
      WorkoutSession.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: '$primaryMuscleGroup', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    console.log('Stats API - Total workouts found:', totalWorkouts);
    console.log('Stats API - Total workout time result:', totalWorkoutTime);

    // Get calorie calculation statistics
    const [calorieCalculations, latestCalorieCalculation] = await Promise.all([
      CalorieCalculation.countDocuments({ userId: user.id }),
      CalorieCalculation.findOne({ userId: user.id }).sort({ date: -1 })
    ]);

    // Get recent workout sessions for activity feed
    const recentWorkouts = await WorkoutSession.find({ userId: userObjectId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name primaryMuscleGroup duration caloriesBurned createdAt');

    // Calculate streaks
    const workoutStreak = await calculateWorkoutStreak(userObjectId);

    // Format statistics
    const stats = {
      workouts: {
        total: totalWorkouts,
        thisWeek: weeklyWorkouts,
        thisMonth: monthlyWorkouts,
        totalTime: totalWorkoutTime[0]?.totalDuration || 0,
        totalCaloriesBurned: totalCaloriesBurned[0]?.totalCalories || 0,
        currentStreak: workoutStreak,
        byMuscleGroup: workoutsByMuscleGroup,
      },
      favorites: {
        total: userData.favoriteExercises?.length || 0,
      },
      calories: {
        calculationsCount: calorieCalculations,
        latest: latestCalorieCalculation,
      },
      recentActivity: {
        workouts: recentWorkouts.map(workout => ({
          id: workout._id,
          name: workout.name,
          muscleGroup: workout.primaryMuscleGroup,
          duration: workout.duration,
          caloriesBurned: workout.caloriesBurned,
          date: workout.createdAt,
        })),
      },
    };

    // Return success response
    return NextResponse.json({ stats });

  } catch (error) {
    console.error('Error fetching user statistics:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error fetching user statistics' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to calculate workout streak
 * @param {ObjectId} userId - The user ID as ObjectId
 * @returns {number} - Current workout streak in days
 */
async function calculateWorkoutStreak(userId) {
  try {
    // Get all workout dates for the user, sorted by date descending
    const workouts = await WorkoutSession.find({ userId })
      .sort({ createdAt: -1 })
      .select('createdAt');

    console.log('Streak calculation - Found workouts:', workouts.length);

    if (workouts.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Check if there's a workout today or yesterday to start the streak
    const latestWorkout = new Date(workouts[0].createdAt);
    latestWorkout.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate - latestWorkout) / (1000 * 60 * 60 * 24));

    if (daysDiff > 1) {
      return 0; // Streak is broken if no workout yesterday or today
    }

    // If latest workout was yesterday, start from yesterday
    if (daysDiff === 1) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Count consecutive days with workouts
    const workoutDates = new Set(
      workouts.map(w => {
        const date = new Date(w.createdAt);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
    );

    while (workoutDates.has(currentDate.getTime())) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  } catch (error) {
    console.error('Error calculating workout streak:', error);
    return 0;
  }
}
