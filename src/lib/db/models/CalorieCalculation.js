/**
 * CalorieCalculation Model
 * 
 * Defines the schema for storing user's calorie calculations.
 * Includes personal information, calculation results, and timestamps.
 */

import mongoose from 'mongoose';

// Define the schema for the CalorieCalculation model
const CalorieCalculationSchema = new mongoose.Schema({
  // Reference to the User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // When the calculation was created
  date: {
    type: Date,
    default: Date.now,
  },
  
  // User's personal information used for the calculation
  personalInfo: {
    age: {
      type: Number,
      required: true,
      min: [1, 'Age must be at least 1'],
      max: [120, 'Age must be less than 120'],
    },
    weight: {
      type: Number,
      required: true,
      min: [1, 'Weight must be at least 1'],
    },
    weightUnit: {
      type: String,
      required: true,
      enum: ['kg', 'lb'],
    },
    height: {
      type: Number,
      required: true,
      min: [1, 'Height must be at least 1'],
    },
    heightUnit: {
      type: String,
      required: true,
      enum: ['cm', 'inch', 'ft/in'],
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    activity: {
      type: String,
      required: true,
      enum: ['sedentary', 'light', 'moderate', 'very_active', 'extremely_active'],
    },
    goal: {
      type: String,
      required: true,
      enum: ['cut', 'bulk', 'maintain'],
    },
  },
  
  // Calculation results
  results: {
    calorieNeed: {
      type: Number,
      required: true,
    },
    calorieBurn: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
  },
  
  // Optional notes about the calculation
  notes: {
    type: String,
    default: '',
  },
});

// Check if model already exists to prevent recompilation during hot reloads
const CalorieCalculation = mongoose.models.CalorieCalculation || 
  mongoose.model('CalorieCalculation', CalorieCalculationSchema);

export default CalorieCalculation;
