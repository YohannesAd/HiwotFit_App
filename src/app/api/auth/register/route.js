/**
 * User Registration API Route
 *
 * This API route handles user registration.
 * It validates input, checks for existing users, and creates new user accounts.
 */

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';

/**
 * POST handler for user registration
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function POST(request) {
  try {
    console.log('Registration API called');

    // Parse request body
    let requestBody;
    try {
      requestBody = await request.json();
      console.log('Request body parsed:', requestBody);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { username, email, password, name } = requestBody;

    // Validate required fields
    if (!username || !email || !password || !name) {
      console.log('Missing required fields:', { username, email, password: !!password, name });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to the database
    try {
      console.log('Connecting to database...');
      await dbConnect();
      console.log('Database connected');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: `Database connection failed: ${dbError.message}` },
        { status: 500 }
      );
    }

    // Check if user already exists
    try {
      console.log('Checking if user exists...');
      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (existingUser) {
        console.log('User already exists:', existingUser.email);
        return NextResponse.json(
          { error: 'User with this email or username already exists' },
          { status: 409 }
        );
      }
      console.log('User does not exist, proceeding with creation');
    } catch (findError) {
      console.error('Error checking existing user:', findError);
      return NextResponse.json(
        { error: `Error checking existing user: ${findError.message}` },
        { status: 500 }
      );
    }

    // Hash password
    let hashedPassword;
    try {
      console.log('Hashing password...');
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return NextResponse.json(
        { error: 'Error processing password' },
        { status: 500 }
      );
    }

    // Create new user
    let user;
    try {
      console.log('Creating new user...');
      user = await User.create({
        username,
        email,
        password: hashedPassword,
        name,
      });
      console.log('User created successfully:', user._id);
    } catch (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: `Error creating user: ${createError.message}` },
        { status: 500 }
      );
    }

    // Remove password from response
    const newUser = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
    };

    // Return success response
    console.log('Registration successful, returning response');
    return NextResponse.json(
      { message: 'User registered successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected registration error:', error);

    // Return error response
    return NextResponse.json(
      { error: `Error registering user: ${error.message}` },
      { status: 500 }
    );
  }
}
