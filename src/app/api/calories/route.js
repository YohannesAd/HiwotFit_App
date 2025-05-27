/**
 * Calorie Calculations API Route
 *
 * This API route handles creating and retrieving calorie calculations.
 * GET: Retrieves all calorie calculations for the logged-in user
 * POST: Creates a new calorie calculation
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import CalorieCalculation from '@/lib/db/models/CalorieCalculation';
import UserActivity from '@/lib/db/models/UserActivity';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * GET handler to retrieve all calorie calculations for the logged-in user
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response with calculations
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

    // Find all calculations for the user, sorted by date (newest first)
    const calculations = await CalorieCalculation.find({
      userId: user.id
    }).sort({ date: -1 });

    // Return calculations
    return NextResponse.json(calculations);
  } catch (error) {
    console.error('Error fetching calculations:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error fetching calculations' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new calorie calculation
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response with the created calculation
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

    // Log the incoming data for debugging
    console.log('Incoming calculation data:', JSON.stringify(data, null, 2));

    // Validate required data
    if (!data.personalInfo || !data.results) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create new calculation
    const calculation = await CalorieCalculation.create({
      userId: user.id,
      personalInfo: data.personalInfo,
      results: data.results,
      notes: data.notes || '',
    });

    // Create activity record
    await UserActivity.create({
      userId: user.id,
      activityType: 'calorie_calculation_created',
      title: 'Created new calorie calculation',
      description: `Calculated daily calorie need: ${data.results.calorieNeed} calories for ${data.personalInfo.goal} goal`,
      relatedId: calculation._id,
      relatedType: 'CalorieCalculation',
      metadata: {
        calorieNeed: data.results.calorieNeed,
        goal: data.personalInfo.goal,
      },
    });

    // Return success response
    return NextResponse.json(
      { message: 'Calculation saved successfully', calculation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving calculation:', error);
    console.error('Error details:', error.message);
    console.error('Validation errors:', error.errors);

    // Return detailed error response for debugging
    return NextResponse.json(
      {
        error: 'Error saving calculation',
        details: error.message,
        validationErrors: error.errors
      },
      { status: 500 }
    );
  }
}
