'use client';

/**
 * Dashboard Page
 *
 * This page displays the user's saved calorie calculations.
 * It is protected and only accessible to authenticated users.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { formatDate, getGoalDescription, formatHeight } from '@/app/utils/formatters';
import styles from '@/app/styles/Dashboard.module.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [calculations, setCalculations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user's saved calculations
  useEffect(() => {
    const fetchCalculations = async () => {
      if (!user) return;

      try {
        const response = await fetch('/api/calories');

        if (!response.ok) {
          throw new Error('Failed to fetch calculations');
        }

        const data = await response.json();
        setCalculations(data);
      } catch (err) {
        console.error('Error fetching calculations:', err);
        setError('Failed to load your saved calculations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalculations();
  }, [user]);



  // Handle calculation deletion
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this calculation?')) {
      try {
        const response = await fetch(`/api/calories/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setCalculations(calculations.filter(calc => calc._id !== id));
        } else {
          throw new Error('Failed to delete calculation');
        }
      } catch (err) {
        console.error('Error deleting calculation:', err);
        setError('Failed to delete calculation');
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          <h1 className={styles.title}>Your Dashboard</h1>

          <div className={styles.dashboardSection}>
            <h2>Saved Calorie Calculations</h2>

            {isLoading ? (
              <p className={styles.loadingText}>Loading your calculations...</p>
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : calculations.length === 0 ? (
              <div className={styles.emptyState}>
                <p>You don&apos;t have any saved calculations yet.</p>
                <button
                  onClick={() => router.push('/features/calories/personal_information_box')}
                  className={styles.createButton}
                >
                  Create Your First Calculation
                </button>
              </div>
            ) : (
              <div className={styles.calculationsList}>
                {calculations.map((calc) => (
                  <div key={calc._id} className={styles.calculationCard}>
                    <div className={styles.calculationHeader}>
                      <h3>{getGoalDescription(calc.personalInfo.goal)} Plan</h3>
                      <span className={styles.date}>{formatDate(calc.date)}</span>
                    </div>

                    <div className={styles.calculationDetails}>
                      <div className={styles.personalInfo}>
                        <p><strong>Age:</strong> {calc.personalInfo.age} years</p>
                        <p><strong>Gender:</strong> {calc.personalInfo.gender === 'male' ? 'Male' : 'Female'}</p>
                        <p><strong>Weight:</strong> {calc.personalInfo.weight} {calc.personalInfo.weightUnit}</p>
                        <p><strong>Height:</strong> {formatHeight(calc.personalInfo.height, calc.personalInfo.heightUnit)}</p>
                      </div>
                      <div className={styles.resultsInfo}>
                        <p><strong>Daily Calories:</strong> {calc.results.calorieNeed}</p>
                        {calc.results.maintenanceCalories && (
                          <p><strong>Maintenance:</strong> {calc.results.maintenanceCalories}</p>
                        )}
                        {calc.results.deficitInfo && (
                          <p><strong>Goal:</strong> {calc.personalInfo.goal} ({calc.results.deficitInfo})</p>
                        )}
                        <div className={styles.macros}>
                          <span className={styles.protein}>P: {calc.results.protein}g</span>
                          <span className={styles.carbs}>C: {calc.results.carbs}g</span>
                          <span className={styles.fat}>F: {calc.results.fat}g</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.calculationActions}>
                      <button
                        onClick={() => router.push(`/calculation/${calc._id}`)}
                        className={styles.viewButton}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(calc._id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
