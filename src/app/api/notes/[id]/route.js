/**
 * Individual Note API Route
 *
 * This API route handles operations for a specific note.
 * GET: Retrieves a specific note by ID
 * PUT: Updates a specific note by ID
 * DELETE: Deletes a specific note by ID
 */

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import Note from '@/lib/db/models/Note';
import { getCurrentUser } from '@/lib/auth/jwt';
import mongoose from 'mongoose';

/**
 * GET /api/notes/[id]
 * Retrieves a specific note by ID
 */
export async function GET(request, { params }) {
  try {
    // Get current user from JWT token
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid note ID' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find the note and ensure it belongs to the current user
    const note = await Note.findOne({
      _id: id,
      userId: user.id,
      isArchived: false
    });

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/notes/[id]
 * Updates a specific note by ID
 */
export async function PUT(request, { params }) {
  try {
    // Get current user from JWT token
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid note ID' },
        { status: 400 }
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

    // Update the note and ensure it belongs to the current user
    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        userId: user.id,
        isArchived: false
      },
      {
        title: data.title.trim(),
        content: data.content.trim(),
        tags: data.tags || [],
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/notes/[id]
 * Deletes a specific note by ID
 */
export async function DELETE(request, { params }) {
  try {
    // Get current user from JWT token
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid note ID' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Delete the note and ensure it belongs to the current user
    const note = await Note.findOneAndDelete({
      _id: id,
      userId: user.id
    });

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
