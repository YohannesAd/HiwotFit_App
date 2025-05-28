/**
 * WorkoutSession Model
 *
 * Defines the schema for storing user's completed workout sessions.
 * Tracks exercises performed, duration, and completion timestamps.
 */

import mongoose from 'mongoose';

// Define the schema for individual exercises within a workout
const ExerciseSchema = new mongoose.Schema({
  exerciseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    default: 0,
  },
  reps: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  weightUnit: {
    type: String,
    enum: ['kg', 'lb'],
    default: 'kg',
  },
  duration: {
    type: Number, // in minutes
    default: 0,
  },
  notes: {
    type: String,
    default: '',
  },
});

// Define the schema for the WorkoutSession model
const WorkoutSessionSchema = new mongoose.Schema({
  // Reference to the User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Workout session details
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // Primary muscle group targeted
  primaryMuscleGroup: {
    type: String,
    required: true,
    enum: ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'calf', 'glutes', 'full_body'],
  },

  // Exercises performed in this session
  exercises: [ExerciseSchema],

  // Session timing
  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },

  // Total duration in minutes
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 minute'],
  },

  // Estimated calories burned
  caloriesBurned: {
    type: Number,
    default: 0,
  },

  // Session notes
  notes: {
    type: String,
    default: '',
  },

  // Session completion status
  completed: {
    type: Boolean,
    default: true,
  },

  // When the session was recorded
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
WorkoutSessionSchema.index({ userId: 1, createdAt: -1 });
WorkoutSessionSchema.index({ userId: 1, primaryMuscleGroup: 1 });

// Check if model already exists to prevent recompilation during hot reloads
const WorkoutSession = mongoose.models.WorkoutSession ||
  mongoose.model('WorkoutSession', WorkoutSessionSchema);

export default WorkoutSession;
