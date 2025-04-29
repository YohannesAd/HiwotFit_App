'use client';

/**
 * Calculation Detail Page
 *
 * This page displays the details of a specific calorie calculation.
 * It is protected and only accessible to authenticated users.
 */

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { formatHeight, formatDate, getActivityDescription, getGoalDescription } from '@/app/utils/formatters';
import styles from '@/app/styles/CalculationDetail.module.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CalculationDetailPage = ({ params }) => {
  const router = useRouter();
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [calculation, setCalculation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch calculation details
  useEffect(() => {
    const fetchCalculation = async () => {
      try {
        const response = await fetch(`/api/calories/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Calculation not found');
          }
          throw new Error('Failed to fetch calculation');
        }

        const data = await response.json();
        setCalculation(data);
      } catch (err) {
        console.error('Error fetching calculation:', err);
        setError(err.message || 'Failed to load calculation details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCalculation();
    }
  }, [id]);

  // Prepare chart data
  const pieData = calculation ? {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: [
        calculation.results.protein,
        calculation.results.carbs,
        calculation.results.fat
      ],
      backgroundColor: ['#D43BF6', '#47CF73', '#FFD93D'],
      borderWidth: 0,
    }],
  } : null;



  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
         

          {isLoading ? (
            <div className={styles.loadingContainer}>
              <p>Loading calculation details...</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{error}</p>
              <button
                className={styles.backButton}
                onClick={() => router.push('/dashboard')}
              >
                Return to Dashboard
              </button>
            </div>
          ) : calculation ? (
            <div className={styles.calculationContainer}>
              <div className={styles.calculationHeader}>
                <h1 className={styles.title}>
                  {getGoalDescription(calculation.personalInfo.goal)} Plan
                </h1>
                <p className={styles.date}>Created on {formatDate(calculation.date)}</p>
              </div>

              <div className={styles.calculationContent}>
                <div className={styles.personalInfoSection}>
                  <h2>Personal Information</h2>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Age:</span>
                      <span className={styles.infoValue}>{calculation.personalInfo.age} years</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Gender:</span>
                      <span className={styles.infoValue}>
                        {calculation.personalInfo.gender === 'male' ? 'Male' : 'Female'}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Weight:</span>
                      <span className={styles.infoValue}>
                        {calculation.personalInfo.weight} {calculation.personalInfo.weightUnit}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Height:</span>
                      <span className={styles.infoValue}>
                        {formatHeight(calculation.personalInfo.height, calculation.personalInfo.heightUnit)}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Activity Level:</span>
                      <span className={styles.infoValue}>
                        {getActivityDescription(calculation.personalInfo.activity)}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Goal:</span>
                      <span className={styles.infoValue}>
                        {getGoalDescription(calculation.personalInfo.goal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.resultsSection}>
                  <h2>Calculation Results</h2>

                  <div className={styles.calorieResults}>
                    <div className={styles.calorieItem}>
                      <span className={styles.calorieLabel}>Daily Calorie Need:</span>
                      <span className={styles.calorieValue}>{calculation.results.calorieNeed} calories</span>
                    </div>
                    <div className={styles.calorieItem}>
                      <span className={styles.calorieLabel}>Estimated Calorie Burn:</span>
                      <span className={styles.calorieValue}>{calculation.results.calorieBurn} calories</span>
                    </div>
                  </div>

                  <div className={styles.macroSection}>
                    <div className={styles.macroChart}>
                      {pieData && <Pie data={pieData} />}
                    </div>

                    <div className={styles.macroDetails}>
                      <h3>Macronutrient Breakdown</h3>
                      <div className={styles.macroItem}>
                        <span className={styles.macroLabel} style={{ color: '#D43BF6' }}>Protein:</span>
                        <span className={styles.macroValue}>{calculation.results.protein}g ({Math.round(calculation.results.protein * 4)} calories)</span>
                      </div>
                      <div className={styles.macroItem}>
                        <span className={styles.macroLabel} style={{ color: '#47CF73' }}>Carbs:</span>
                        <span className={styles.macroValue}>{calculation.results.carbs}g ({Math.round(calculation.results.carbs * 4)} calories)</span>
                      </div>
                      <div className={styles.macroItem}>
                        <span className={styles.macroLabel} style={{ color: '#FFD93D' }}>Fat:</span>
                        <span className={styles.macroValue}>{calculation.results.fat}g ({Math.round(calculation.results.fat * 9)} calories)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button
                  className={styles.recalculateButton}
                  onClick={() => router.push('/features/calories/personal_information_box')}
                >
                  Create New Calculation
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this calculation?')) {
                      try {
                        const response = await fetch(`/api/calories/${id}`, {
                          method: 'DELETE',
                        });

                        if (response.ok) {
                          router.push('/dashboard');
                        } else {
                          throw new Error('Failed to delete calculation');
                        }
                      } catch (err) {
                        console.error('Error deleting calculation:', err);
                        setError('Failed to delete calculation');
                      }
                    }
                  }}
                >
                  Delete Calculation
                </button>
              </div>
            </div>
          ) : null}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CalculationDetailPage;
