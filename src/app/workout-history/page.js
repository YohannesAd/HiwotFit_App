'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import WorkoutLogger from '@/app/components/WorkoutLogger';
import styles from '@/app/styles/WorkoutHistory.module.css';

const WorkoutHistoryPage = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [groupedWorkouts, setGroupedWorkouts] = useState({});
  const [expandedDates, setExpandedDates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);

  // Function to group workouts by date
  const groupWorkoutsByDate = (workouts) => {
    const grouped = {};
    workouts.forEach(workout => {
      const date = new Date(workout.createdAt).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(workout);
    });
    return grouped;
  };

  // Function to toggle date expansion
  const toggleDateExpansion = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  // Function to fetch workouts (reusable)
  const fetchWorkouts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/workouts?limit=50');
      if (response.ok) {
        const data = await response.json();
        const fetchedWorkouts = data.workouts || [];
        setWorkouts(fetchedWorkouts);

        // Group workouts by date
        const grouped = groupWorkoutsByDate(fetchedWorkouts);
        setGroupedWorkouts(grouped);

        // Auto-expand the most recent date
        const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
        if (dates.length > 0) {
          setExpandedDates({ [dates[0]]: true });
        }
      } else {
        setError('Failed to fetch workout history');
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError('An error occurred while fetching workouts');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle workout logged
  const handleWorkoutLogged = (workout) => {
    console.log('Workout logged:', workout);
    // Refresh data to show the new workout
    fetchWorkouts();
  };

  useEffect(() => {
    if (!user) return;
    fetchWorkouts();
  }, [user, fetchWorkouts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const getMuscleGroupEmoji = (muscleGroup) => {
    const emojis = {
      chest: '💪',
      back: '🔙',
      shoulders: '🤲',
      arms: '💪',
      legs: '🦵',
      core: '🔥',
      calf: '🦵',
      glutes: '🍑',
      full_body: '🏋️'
    };
    return emojis[muscleGroup] || '🏋️';
  };

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          <h1 className={styles.title}>Workout History</h1>
          <p className={styles.subtitle}>Your complete workout journey</p>

          {/* Log Workout Button */}
          <div className={styles.actionSection}>
            <button
              className={styles.logWorkoutButton}
              onClick={() => setShowWorkoutLogger(true)}
            >
              📝 Log Workout
            </button>
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>Loading your workout history...</div>
          ) : error ? (
            <div className={styles.errorState}>{error}</div>
          ) : workouts.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No workouts found</h3>
              <p>Start logging your workouts to see them here!</p>
            </div>
          ) : (
            <div className={styles.workoutList}>
              {Object.keys(groupedWorkouts)
                .sort((a, b) => new Date(b) - new Date(a))
                .map((date) => (
                  <div key={date} className={styles.dateGroup}>
                    <div
                      className={styles.dateHeader}
                      onClick={() => toggleDateExpansion(date)}
                    >
                      <div className={styles.dateHeaderContent}>
                        <h2 className={styles.dateTitle}>{formatDateHeader(date)}</h2>
                        <span className={styles.workoutCount}>
                          {groupedWorkouts[date].length} workout{groupedWorkouts[date].length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className={`${styles.expandIcon} ${expandedDates[date] ? styles.expanded : ''}`}>
                        ▼
                      </div>
                    </div>

                    {expandedDates[date] && (
                      <div className={styles.dateWorkouts}>
                        {groupedWorkouts[date].map((workout) => (
                <div key={workout._id} className={styles.workoutCard}>
                  <div className={styles.workoutHeader}>
                    <div className={styles.workoutTitle}>
                      <span className={styles.muscleGroupEmoji}>
                        {getMuscleGroupEmoji(workout.primaryMuscleGroup)}
                      </span>
                      <h3>{workout.name}</h3>
                    </div>
                    <div className={styles.workoutDate}>
                      {formatDate(workout.createdAt)}
                    </div>
                  </div>

                  <div className={styles.workoutStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Duration</span>
                      <span className={styles.statValue}>{workout.duration} min</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Muscle Group</span>
                      <span className={styles.statValue}>
                        {workout.primaryMuscleGroup.charAt(0).toUpperCase() + workout.primaryMuscleGroup.slice(1)}
                      </span>
                    </div>
                    {workout.caloriesBurned > 0 && (
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Calories</span>
                        <span className={styles.statValue}>{workout.caloriesBurned}</span>
                      </div>
                    )}
                    {workout.exercises && workout.exercises.length > 0 && (
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Exercises</span>
                        <span className={styles.statValue}>{workout.exercises.length}</span>
                      </div>
                    )}
                  </div>

                  {workout.notes && (
                    <div className={styles.workoutNotes}>
                      <h4>Notes:</h4>
                      <p>{workout.notes}</p>
                    </div>
                  )}

                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className={styles.exerciseList}>
                      <h4>Exercises:</h4>
                      <div className={styles.exercises}>
                        {workout.exercises.map((exercise, index) => (
                          <div key={index} className={styles.exercise}>
                            <span className={styles.exerciseName}>{exercise.title}</span>
                            {exercise.sets > 0 && exercise.reps > 0 && (
                              <span className={styles.exerciseDetails}>
                                {exercise.sets} × {exercise.reps}
                                {exercise.weight > 0 && ` @ ${exercise.weight}${exercise.weightUnit}`}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                      ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </main>
        <Footer />

        {/* Workout Logger Modal */}
        {showWorkoutLogger && (
          <WorkoutLogger
            onWorkoutLogged={handleWorkoutLogged}
            onClose={() => setShowWorkoutLogger(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default WorkoutHistoryPage;
