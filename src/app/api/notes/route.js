/**
 * Notes API Route
 *
 * This API route handles note operations for authenticated users.
 * GET: Retrieves all notes for the logged-in user
 * POST: Creates a new note for the logged-in user
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import Note from '@/lib/db/models/Note';
import { getCurrentUser } from '@/lib/auth/jwt';

/**
 * GET /api/notes
 * Retrieves all notes for the authenticated user
 */
export async function GET() {
  try {
    // Get current user from JWT token
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Fetch user's notes, sorted by creation date (newest first)
    const notes = await Note.find({ 
      userId: user.id,
      isArchived: false 
    })
    .sort({ createdAt: -1 })
    .select('title content tags createdAt updatedAt');

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notes
 * Creates a new note for the authenticated user
 */
export async function POST(request) {
  try {
    // Get current user from JWT token
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (data.title.length > 200) {
      return NextResponse.json(
        { error: 'Title cannot exceed 200 characters' },
        { status: 400 }
      );
    }

    if (data.content.length > 10000) {
      return NextResponse.json(
        { error: 'Content cannot exceed 10000 characters' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create new note
    const note = await Note.create({
      userId: user.id,
      title: data.title.trim(),
      content: data.content.trim(),
      tags: data.tags || [],
    });

    // Return the created note
    return NextResponse.json({
      _id: note._id,
      title: note.title,
      content: note.content,
      tags: note.tags,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
