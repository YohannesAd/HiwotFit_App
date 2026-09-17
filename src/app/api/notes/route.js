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
import { getNoteContentError } from '@/utils/noteContent';
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
    .select('title content tags attachments createdAt updatedAt');

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

    if (typeof data.title !== 'string' || !data.title.trim() || data.title.length > 200) {
      return NextResponse.json({ error: 'A title of 1 to 200 characters is required.' }, { status: 400 });
    }
    const contentError = getNoteContentError(data.content);
    if (contentError) {
      return NextResponse.json({ error: contentError }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Create new note
    const note = await Note.create({
      userId: user.id,
      title: data.title.trim(),
      content: data.content, // Don't trim content as it may contain media placeholders
      tags: data.tags || [],
      attachments: data.attachments || [],
    });

    // Return the created note
    return NextResponse.json({
      _id: note._id,
      title: note.title,
      content: note.content,
      tags: note.tags,
      attachments: note.attachments,
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
