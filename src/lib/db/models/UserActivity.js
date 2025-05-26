/**
 * UserActivity Model
 * 
 * Defines the schema for tracking all user activities across the app.
 * This creates a unified activity feed for the home page.
 */

import mongoose from 'mongoose';

// Define the schema for the UserActivity model
const UserActivitySchema = new mongoose.Schema({
  // Reference to the User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Type of activity
  activityType: {
    type: String,
    required: true,
    enum: [
      'workout_completed',
      'favorite_added',
      'favorite_removed',
      'calorie_calculation_created',
      'calorie_calculation_updated',
      'profile_updated',
      'account_created'
    ],
  },
  
  // Activity title/description
  title: {
    type: String,
    required: true,
  },
  
  // Detailed description of the activity
  description: {
    type: String,
    default: '',
  },
  
  // Reference to related data (workout session, calculation, etc.)
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  
  // Type of related data for proper referencing
  relatedType: {
    type: String,
    enum: ['WorkoutSession', 'CalorieCalculation', 'User', null],
    default: null,
  },
  
  // Additional metadata specific to the activity type
  metadata: {
    // For workouts
    workoutName: String,
    primaryMuscleGroup: String,
    duration: Number,
    caloriesBurned: Number,
    exerciseCount: Number,
    
    // For favorites
    exerciseTitle: String,
    exerciseCategory: String,
    
    // For calorie calculations
    calorieNeed: Number,
    goal: String,
    
    // For profile updates
    fieldsUpdated: [String],
  },
  
  // When the activity occurred
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
UserActivitySchema.index({ userId: 1, createdAt: -1 });
UserActivitySchema.index({ userId: 1, activityType: 1, createdAt: -1 });

// Check if model already exists to prevent recompilation during hot reloads
const UserActivity = mongoose.models.UserActivity || 
  mongoose.model('UserActivity', UserActivitySchema);

export default UserActivity;
