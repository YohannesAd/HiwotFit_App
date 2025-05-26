'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const TestWorkoutPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createSampleWorkout = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const now = new Date();
      const startTime = new Date(now.getTime() - 45 * 60000); // 45 minutes ago

      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Sample Chest Workout',
          primaryMuscleGroup: 'chest',
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
          caloriesBurned: 350,
          notes: 'Great workout! Felt strong today.',
          exercises: [
            {
              exerciseId: 'bench_press',
              title: 'Bench Press',
              category: 'chest',
              sets: 4,
              reps: 10,
              weight: 80,
              weightUnit: 'kg'
            },
            {
              exerciseId: 'incline_dumbbell_press',
              title: 'Incline Dumbbell Press',
              category: 'chest',
              sets: 3,
              reps: 12,
              weight: 30,
              weightUnit: 'kg'
            }
          ]
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Sample workout created successfully! Check your home page to see it in the activity feed.');
        console.log('Created workout:', data.workout);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating sample workout:', error);
      setMessage('An error occurred while creating the sample workout');
    } finally {
      setIsLoading(false);
    }
  };

  const createSampleActivity = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Create a sample calorie calculation first
      const calorieResponse = await fetch('/api/calories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalInfo: {
            age: 25,
            weight: 70,
            weightUnit: 'kg',
            height: 175,
            heightUnit: 'cm',
            gender: 'male',
            activity: 'moderate',
            goal: 'maintain'
          },
          results: {
            calorieNeed: 2500,
            calorieBurn: 2200,
            protein: 140,
            carbs: 312,
            fat: 83
          },
          notes: 'Sample calculation for testing'
        }),
      });

      if (calorieResponse.ok) {
        setMessage('Sample calorie calculation created! This will also appear in your activity feed.');
      } else {
        const errorData = await calorieResponse.json();
        setMessage(`Error creating calorie calculation: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating sample activity:', error);
      setMessage('An error occurred while creating the sample activity');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
          <h1>Test Real-Time Data</h1>
          <p>Use this page to create sample data and test the real-time functionality on the home page.</p>
          
          {message && (
            <div style={{
              padding: '1rem',
              margin: '1rem 0',
              backgroundColor: message.includes('Error') ? 'rgba(220, 53, 69, 0.2)' : 'rgba(40, 167, 69, 0.2)',
              border: `1px solid ${message.includes('Error') ? 'rgba(220, 53, 69, 0.5)' : 'rgba(40, 167, 69, 0.5)'}`,
              borderRadius: '6px',
              color: message.includes('Error') ? '#ff6b6b' : '#28a745'
            }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button
              onClick={createSampleWorkout}
              disabled={isLoading}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#e98e0f',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Creating...' : 'Create Sample Workout'}
            </button>

            <button
              onClick={createSampleActivity}
              disabled={isLoading}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#17a2b8',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Creating...' : 'Create Sample Calorie Calculation'}
            </button>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(40, 40, 40, 0.8)', borderRadius: '6px' }}>
            <h3>Instructions:</h3>
            <ol>
              <li>Click the buttons above to create sample data</li>
              <li>Go to the home page to see the real-time updates</li>
              <li>Check the "Your Stats" section for updated workout counts and statistics</li>
              <li>Check the "Recent Activity" section for the new activities</li>
              <li>Try adding/removing favorites to see those activities too</li>
            </ol>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default TestWorkoutPage;
