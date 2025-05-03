'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
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
      fetchFavorites();
    };

    // Add event listener for favorite updates
    window.addEventListener('favoriteUpdate', handleFavoriteUpdate);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('favoriteUpdate', handleFavoriteUpdate);
    };

  }, [user]);

  // Function to fetch calorie information
  const fetchCalorieInfo = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/calories');
      if (response.ok) {
        const data = await response.json();
        // Check if data is an array or if it has a calculations property
        if (Array.isArray(data) && data.length > 0) {
          setCalorieInfo(data[0]); // Get most recent calculation
        } else if (data.calculations && Array.isArray(data.calculations) && data.calculations.length > 0) {
          setCalorieInfo(data.calculations[0]); // Get most recent calculation
        }
      }
    } catch (error) {
      console.error('Error fetching calorie info:', error);
    }
  };

  // Effect to fetch data when user is authenticated
  useEffect(() => {
    if (!user) return;

    // Fetch data
    fetchFavorites();
    fetchCalorieInfo();

    // Mock recent workouts (would be replaced with actual API call)
    setRecentWorkouts([
      { id: 1, name: 'Chest Workout', date: '2 days ago' },
      { id: 2, name: 'Leg Day', date: '5 days ago' },
    ]);
  }, [user]);

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
              "The only bad workout is the one that didn't happen."
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
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3 className={styles.statTitle}>Workouts</h3>
                <p className={styles.statValue}>{recentWorkouts.length}</p>
              </div>

              <div
                className={styles.statCard}
                onClick={() => calorieInfo && calorieInfo._id && router.push(`/calculation/${calorieInfo._id}`)}
                style={{ cursor: calorieInfo && calorieInfo._id ? 'pointer' : 'default' }}
              >
                <h3 className={styles.statTitle}>Calories</h3>
                <p className={styles.statValue}>
                  {calorieInfo && calorieInfo.results && calorieInfo.results.calorieNeed
                    ? `${calorieInfo.results.calorieNeed}/day`
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
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.recentActivity}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className={styles.activityList}>
              {recentWorkouts.length > 0 ? (
                recentWorkouts.map(workout => (
                  <div key={workout.id} className={styles.activityItem}>
                    <span className={styles.activityIcon}>•</span>
                    <div className={styles.activityContent}>
                      <span className={styles.activityText}>
                        Completed {workout.name} - {workout.date}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyState}>No recent workouts found</p>
              )}

              {calorieInfo && calorieInfo.date && (
                <div
                  className={styles.activityItem}
                  onClick={() => calorieInfo._id && router.push(`/calculation/${calorieInfo._id}`)}
                  style={{ cursor: calorieInfo._id ? 'pointer' : 'default' }}
                >
                  <span className={styles.activityIcon}>•</span>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>
                      Updated calorie calculation - {calorieInfo.date ? new Date(calorieInfo.date).toISOString().split('T')[0] : ''}
                    </span>
                    {calorieInfo.results && (
                      <div className={styles.activityDetails}>
                        <span>Daily Need: <strong>{calorieInfo.results.calorieNeed} cal</strong></span>
                        <span>Protein: <strong>{calorieInfo.results.protein}g</strong></span>
                        <span>Carbs: <strong>{calorieInfo.results.carbs}g</strong></span>
                        <span>Fat: <strong>{calorieInfo.results.fat}g</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {favoriteExercises.length > 0 && (
                <div
                  className={styles.activityItem}
                  onClick={() => router.push('/favorites')}
                  style={{ cursor: 'pointer' }}
                >
                  <span className={styles.activityIcon}>•</span>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>
                      {favoriteExercises.length === 1
                        ? 'Added 1 exercise to favorites'
                        : `Added ${favoriteExercises.length} exercises to favorites`}
                    </span>
                    {favoriteExercises.length > 0 && (
                      <div className={styles.activityDetails}>
                        {/* Show the first 3 favorites */}
                        {favoriteExercises.slice(0, 3).map((exercise, index) => (
                          <span key={index}>{exercise.title}</span>
                        ))}
                        {/* If there are more than 3 favorites, show how many more */}
                        {favoriteExercises.length > 3 && (
                          <span>+{favoriteExercises.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
