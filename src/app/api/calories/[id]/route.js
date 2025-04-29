/**
 * Individual Calorie Calculation API Route
 *
 * This API route handles operations on a specific calorie calculation.
 * GET: Retrieves a specific calculation
 * PUT: Updates a specific calculation
 * DELETE: Deletes a specific calculation
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import CalorieCalculation from '@/lib/db/models/CalorieCalculation';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * GET handler to retrieve a specific calorie calculation
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters containing the calculation ID
 * @returns {NextResponse} - The API response with the calculation
 */
export async function GET(request, { params }) {
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

    // Get calculation ID from route parameters
    const { id } = await params;

    // Connect to the database
    await dbConnect();

    // Find the calculation that belongs to the user
    const calculation = await CalorieCalculation.findOne({
      _id: id,
      userId: user.id
    });

    // If calculation not found, return 404
    if (!calculation) {
      return NextResponse.json(
        { error: 'Calculation not found' },
        { status: 404 }
      );
    }

    // Return the calculation
    return NextResponse.json(calculation);
  } catch (error) {
    console.error('Error fetching calculation:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error fetching calculation' },
      { status: 500 }
    );
  }
}

/**
 * PUT handler to update a specific calorie calculation
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters containing the calculation ID
 * @returns {NextResponse} - The API response with the updated calculation
 */
export async function PUT(request, { params }) {
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

    // Get calculation ID from route parameters
    const { id } = await params;

    // Parse request body
    const data = await request.json();

    // Connect to the database
    await dbConnect();

    // Find and update the calculation that belongs to the user
    const calculation = await CalorieCalculation.findOneAndUpdate(
      { _id: id, userId: user.id },
      { $set: data },
      { new: true } // Return the updated document
    );

    // If calculation not found, return 404
    if (!calculation) {
      return NextResponse.json(
        { error: 'Calculation not found' },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: 'Calculation updated successfully', calculation }
    );
  } catch (error) {
    console.error('Error updating calculation:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error updating calculation' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler to remove a specific calorie calculation
 * @param {Request} request - The incoming request object
 * @param {Object} params - Route parameters containing the calculation ID
 * @returns {NextResponse} - The API response
 */
export async function DELETE(request, { params }) {
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

    // Get calculation ID from route parameters
    const { id } = await params;

    // Connect to the database
    await dbConnect();

    // Find and delete the calculation that belongs to the user
    const calculation = await CalorieCalculation.findOneAndDelete({
      _id: id,
      userId: user.id
    });

    // If calculation not found, return 404
    if (!calculation) {
      return NextResponse.json(
        { error: 'Calculation not found' },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: 'Calculation deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting calculation:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Error deleting calculation' },
      { status: 500 }
    );
  }
}
