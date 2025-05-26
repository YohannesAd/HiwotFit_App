'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/WorkoutLogger.module.css';

const WorkoutLogger = ({ onWorkoutLogged, onClose }) => {
  const [workoutData, setWorkoutData] = useState({
    name: '',
    primaryMuscleGroup: 'chest',
    duration: '',
    caloriesBurned: '',
    notes: '',
    exercises: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const muscleGroups = [
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'legs', label: 'Legs' },
    { value: 'core', label: 'Core' },
    { value: 'full_body', label: 'Full Body' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!workoutData.name || !workoutData.duration) {
      setError('Please fill in workout name and duration');
      return;
    }

    if (parseInt(workoutData.duration) <= 0) {
      setError('Duration must be greater than 0');
      return;
    }

    setIsLoading(true);

    try {
      const now = new Date();
      const startTime = new Date(now.getTime() - parseInt(workoutData.duration) * 60000);

      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: workoutData.name,
          primaryMuscleGroup: workoutData.primaryMuscleGroup,
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
          caloriesBurned: parseInt(workoutData.caloriesBurned) || 0,
          notes: workoutData.notes,
          exercises: workoutData.exercises
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onWorkoutLogged && onWorkoutLogged(data.workout);
        onClose && onClose();
        
        // Reset form
        setWorkoutData({
          name: '',
          primaryMuscleGroup: 'chest',
          duration: '',
          caloriesBurned: '',
          notes: '',
          exercises: []
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to log workout');
      }
    } catch (error) {
      console.error('Error logging workout:', error);
      setError('An error occurred while logging workout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Log Workout</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="workoutName">Workout Name *</label>
            <input
              id="workoutName"
              type="text"
              value={workoutData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Morning Chest Workout"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="muscleGroup">Primary Muscle Group *</label>
            <select
              id="muscleGroup"
              value={workoutData.primaryMuscleGroup}
              onChange={(e) => handleInputChange('primaryMuscleGroup', e.target.value)}
              required
            >
              {muscleGroups.map(group => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="duration">Duration (minutes) *</label>
              <input
                id="duration"
                type="number"
                min="1"
                value={workoutData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="45"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="calories">Calories Burned</label>
              <input
                id="calories"
                type="number"
                min="0"
                value={workoutData.caloriesBurned}
                onChange={(e) => handleInputChange('caloriesBurned', e.target.value)}
                placeholder="300"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={workoutData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="How did the workout go? Any notes..."
              rows="3"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging...' : 'Log Workout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutLogger;
