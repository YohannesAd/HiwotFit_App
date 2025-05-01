/**
 * User Model
 *
 * Defines the schema for user data in MongoDB.
 * Includes fields for authentication and user information.
 */

import mongoose from 'mongoose';

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  // Username must be unique
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },

  // Email must be unique
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
    lowercase: true,
    trim: true,
  },

  // Password will be hashed before saving
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },

  // User's display name
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },

  // Profile picture URL
  profilePicture: {
    type: String,
    default: '',
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  lastLogin: {
    type: Date,
    default: Date.now,
  },

  // Password reset fields
  resetPasswordCode: {
    type: String,
  },

  resetPasswordExpires: {
    type: Date,
  },

  // Favorite exercises
  favoriteExercises: [{
    exerciseId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    embedUrl: {
      type: String,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
});

// Check if model already exists to prevent recompilation during hot reloads
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
