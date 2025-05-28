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

  // Note content (supports rich text with embedded media)
  content: {
    type: String,
    required: [true, 'Please provide content for the note'],
    maxlength: [50000, 'Content cannot exceed 50000 characters'], // Increased for rich content
  },

  // Content type (plain text or rich text)
  contentType: {
    type: String,
    enum: ['plain', 'rich'],
    default: 'rich',
  },

  // Optional tags for categorization
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters'],
  }],

  // File attachments
  attachments: [{
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileData: {
      type: String, // Base64 encoded file data
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
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
