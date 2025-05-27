/**
 * Note Model
 *
 * Defines the schema for user notes in MongoDB.
 * Includes fields for note content, timestamps, and user association.
 */

import mongoose from 'mongoose';

// Define the schema for the Note model
const NoteSchema = new mongoose.Schema({
  // Reference to the User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Note title
  title: {
    type: String,
    required: [true, 'Please provide a title for the note'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },

  // Note content
  content: {
    type: String,
    required: [true, 'Please provide content for the note'],
    maxlength: [10000, 'Content cannot exceed 10000 characters'],
  },

  // Optional tags for categorization
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters'],
  }],

  // Note status
  isArchived: {
    type: Boolean,
    default: false,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
NoteSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Add indexes for better query performance
NoteSchema.index({ userId: 1, createdAt: -1 });
NoteSchema.index({ userId: 1, updatedAt: -1 });
NoteSchema.index({ userId: 1, isArchived: 1, createdAt: -1 });

// Check if model already exists to prevent recompilation during hot reloads
const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default Note;
