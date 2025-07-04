'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import WorkoutLogger from '@/app/components/WorkoutLogger';
import Image from 'next/image';
import Link from 'next/link';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import styles from '@/app/styles/Home.module.css';

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [favoriteExercises, setFavoriteExercises] = useState([]);
  const [calorieInfo, setCalorieInfo] = useState(null);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);

  // Function to fetch favorite exercises
  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        // The API returns { favorites: [...] }, so we need to access the favorites property
        if (data.favorites && Array.isArray(data.favorites)) {
          // Store all favorites, not just the first 3
          setFavoriteExercises(data.favorites);
          console.log(`HomePage - Fetched ${data.favorites.length} favorites`);
        } else {
          setFavoriteExercises([]); // Set empty array if no favorites
          console.log('HomePage - No favorites found');
        }
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Fetch user data
  useEffect(() => {
    console.log('HomePage - User state:', user ? 'authenticated' : 'not authenticated');

    if (!user) {
      console.log('HomePage - No user data, skipping data fetching');
      return;
    }

    console.log('HomePage - User authenticated, fetching data');

    // Create a function to handle favorite updates
    const handleFavoriteUpdate = () => {
      console.log('HomePage - Favorite update event received, refreshing data');
      refreshData(); // Use refreshData instead of just fetchFavorites
    };

    // Add event listener for favorite updates
    window.addEventListener('favoriteUpdate', handleFavoriteUpdate);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('favoriteUpdate', handleFavoriteUpdate);
    };

  }, [user]);

  // Function to fetch user statistics
  const fetchStats = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        console.log('HomePage - Stats data received:', data.stats);
        console.log('HomePage - Total workout time:', data.stats?.workouts?.totalTime);
        setStats(data.stats);

        // Set individual state for backward compatibility
        setRecentWorkouts(data.stats.recentActivity.workouts || []);
        setCalorieInfo(data.stats.calories.latest);
      } else {
        console.error('HomePage - Failed to fetch stats:', response.status);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Function to fetch user activities (workouts only) - Limited to 5 for recent workouts
  const fetchActivities = async () => {
    if (!user) return;

    try {
      // Only fetch the last 5 workout-related activities for recent workouts section
      const response = await fetch('/api/activities?limit=5&type=workout_completed');
      if (response.ok) {
        const data = await response.json();
        setActivities(data.activities || []);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  // Effect to fetch data when user is authenticated
  useEffect(() => {
    if (!user) return;

    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        await Promise.all([
          fetchFavorites(),
          fetchStats(),
          fetchActivities()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [user]);

  // Function to refresh data (can be called when activities are updated)
  const refreshData = async () => {
    if (!user) return;

    try {
      await Promise.all([
        fetchFavorites(),
        fetchStats(),
        fetchActivities()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // Handle workout logged
  const handleWorkoutLogged = (workout) => {
    console.log('Workout logged:', workout);
    // Refresh data to show the new workout
    refreshData();
  };

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          {/* Welcome Section */}
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>
              Welcome back, {user?.name || 'Fitness Enthusiast'}!
            </h1>
            <p className={styles.welcomeQuote}>
              "              The only bad workout is the one that didn&apos;t happen."
            </p>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <div
              className={styles.actionCard}
              onClick={() => router.push('/features/workout/list_of_muscle')}
            >
              <div className={styles.actionIcon}>
                <Image src="/assets/workout.png" alt="Start Workout" width={60} height={60} />
              </div>
              <h3 className={styles.actionTitle}>Start Workout</h3>
              <p className={styles.actionDescription}>
                Choose a muscle group and begin your training session
              </p>
            </div>

            <div
              className={styles.actionCard}
              onClick={() => router.push('/features/calories/personal_information_box')}
            >
              <div className={styles.actionIcon}>
                <Image src="/assets/calories.png" alt="Track Calories" width={60} height={60} />
              </div>
              <h3 className={styles.actionTitle}>Track Calories</h3>
              <p className={styles.actionDescription}>
                Calculate your daily calorie needs based on your goals
              </p>
            </div>

            <div
              className={styles.actionCard}
              onClick={() => router.push('/favorites')}
            >
              <div className={styles.actionIcon}>
                <Image src="/assets/workout.png" alt="My Favorites" width={60} height={60} />
              </div>
              <h3 className={styles.actionTitle}>My Favorites</h3>
              <p className={styles.actionDescription}>
                Access your saved favorite exercises quickly
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>Your Stats</h2>
            {isLoading ? (
              <div className={styles.loadingState}>Loading your stats...</div>
            ) : (
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Total Workouts</h3>
                  <p className={styles.statValue}>{stats?.workouts?.total || 0}</p>
                  {stats?.workouts?.thisWeek > 0 && (
                    <p className={styles.statSubtext}>
                      {stats.workouts.thisWeek} this week
                    </p>
                  )}
                </div>

                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Workout Time</h3>
                  <p className={styles.statValue}>
                    {stats?.workouts?.totalTime ? `${Math.round(stats.workouts.totalTime / 60)}h` : '0h'}
                  </p>
                  {stats?.workouts?.totalTime > 0 && (
                    <p className={styles.statSubtext}>
                      Total time spent
                    </p>
                  )}
                </div>

                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Workout Streak</h3>
                  <p className={styles.statValue}>{stats?.workouts?.currentStreak || 0}</p>
                  <p className={styles.statSubtext}>
                    {stats?.workouts?.currentStreak === 1 ? 'day' : 'days'}
                  </p>
                </div>

                <div
                  className={styles.statCard}
                  onClick={() => calorieInfo && calorieInfo._id && router.push(`/calculation/${calorieInfo._id}`)}
                  style={{ cursor: calorieInfo && calorieInfo._id ? 'pointer' : 'default' }}
                >
                  <h3 className={styles.statTitle}>Daily Calories</h3>
                  <p className={styles.statValue}>
                    {calorieInfo && calorieInfo.results && calorieInfo.results.calorieNeed
                      ? `${calorieInfo.results.calorieNeed}`
                      : 'Not set'}
                  </p>
                  {calorieInfo && calorieInfo.results && calorieInfo.personalInfo && calorieInfo.personalInfo.goal && (
                    <p className={styles.statSubtext}>
                      Goal: {calorieInfo.personalInfo.goal.charAt(0).toUpperCase() + calorieInfo.personalInfo.goal.slice(1)}
                    </p>
                  )}
                </div>

                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Favorites</h3>
                  <p className={styles.statValue}>{favoriteExercises.length}</p>
                  <p className={styles.statSubtext}>Saved exercises</p>
                </div>

                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Calories Burned</h3>
                  <p className={styles.statValue}>{stats?.workouts?.totalCaloriesBurned || 0}</p>
                  <p className={styles.statSubtext}>Total burned</p>
                </div>
              </div>
            )}
          </div>

          {/* Recent Workouts */}
          <div className={styles.recentActivity}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Workouts</h2>
              {activities.length > 0 && (
                <Link href="/workout-history" className={styles.viewAllLink}>
                  View All
                </Link>
              )}
            </div>
            {isLoading ? (
              <div className={styles.loadingState}>Loading your recent workouts...</div>
            ) : (
              <div className={styles.activityList}>
                {activities.length > 0 ? (
                  activities.map(activity => (
                    <div key={activity.id} className={styles.activityItem}>
                      <span className={styles.activityIcon}>🏋️</span>
                      <div className={styles.activityContent}>
                        <span className={styles.activityText}>
                          {activity.title}
                        </span>
                        <span className={styles.activityDate}>
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {activity.description && (
                          <p className={styles.activityDescription}>
                            {activity.description}
                          </p>
                        )}
                        {activity.metadata && (
                          <div className={styles.activityDetails}>
                            <span>Duration: <strong>{activity.metadata.duration} min</strong></span>
                            {activity.metadata.caloriesBurned > 0 && (
                              <span>Calories: <strong>{activity.metadata.caloriesBurned}</strong></span>
                            )}
                            <span>Muscle Group: <strong>{activity.metadata.primaryMuscleGroup}</strong></span>
                            {activity.metadata.notes && (
                              <div className={styles.workoutNotes}>
                                <strong>Notes:</strong> {activity.metadata.notes}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>No recent workouts found</p>
                    <p>Start logging your workouts to see them here!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <button
              className={styles.logWorkoutButton}
              onClick={() => setShowWorkoutLogger(true)}
            >
              📝 Log Workout
            </button>
            <Link href="/workout-history" className={styles.historyButton}>
              📊 View History
            </Link>
          </div>
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

export default HomePage;
