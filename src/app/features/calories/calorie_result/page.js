'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/calorie_calculation_result.module.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CalorieResultContent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const age = parseInt(params.get('age'));
  const gender = params.get('gender');
  let weight = parseFloat(params.get('weight'));
  const weightUnit = params.get('weightUnit');
  let height = parseFloat(params.get('height'));
  const heightUnit = params.get('heightUnit');
  const activity = params.get('activity');
  const goal = params.get('goal');

  // Convert weight from pounds to kilograms if needed
  if (weightUnit === 'lb') weight = weight * 0.453592;

  // Convert height to centimeters if needed
  if (heightUnit === 'inch' || heightUnit === 'ft/in') height = height * 2.54;

  // Calculate BMR using Mifflin-St Jeor equation
  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  // Activity multipliers (Harris-Benedict)
  let multiplier = 1.2; // Default (sedentary)
  if (activity === 'light') multiplier = 1.375;
  else if (activity === 'moderate') multiplier = 1.55;
  else if (activity === 'very_active') multiplier = 1.725;
  else if (activity === 'extremely_active') multiplier = 1.9;

  // Calculate TDEE (Total Daily Energy Expenditure)
  let tdee = bmr * multiplier;

  // Improved goal-based calorie adjustments
  let calorieAdjustment = 0;
  let deficitInfo = '';

  if (goal === 'cut') {
    // Moderate deficit for sustainable weight loss (1 lb/week)
    calorieAdjustment = -500;
    deficitInfo = 'moderate deficit (1 lb/week)';
    // Ensure minimum calories for safety
    const minCalories = gender === 'male' ? 1500 : 1200;
    if (tdee + calorieAdjustment < minCalories) {
      calorieAdjustment = minCalories - tdee;
      deficitInfo = 'conservative deficit (adjusted for safety)';
    }
  } else if (goal === 'bulk') {
    // Conservative surplus for lean gains
    calorieAdjustment = 300;
    deficitInfo = 'lean bulk surplus';
  } else {
    deficitInfo = 'maintenance calories';
  }

  const calorieNeed = Math.round(tdee + calorieAdjustment);
  const maintenanceCalories = Math.round(tdee);

  // Calculate activity calories (calories from exercise/activity above BMR)
  const activityCalories = Math.round((tdee - bmr));

  // Improved macro calculations based on scientific recommendations
  let protein, fat, carbs;

  if (goal === 'cut') {
    // Higher protein during cutting to preserve muscle mass
    protein = Math.round(weight * 1.6); // 1.6g per kg
    fat = Math.round(weight * 1.0); // 1.0g per kg
  } else if (goal === 'bulk') {
    // Moderate protein for muscle building
    protein = Math.round(weight * 1.4); // 1.4g per kg
    fat = Math.round(weight * 1.2); // 1.2g per kg
  } else { // maintain
    // Standard healthy intake
    protein = Math.round(weight * 1.2); // 1.2g per kg
    fat = Math.round(weight * 1.0); // 1.0g per kg
  }

  // Ensure fat is at least 20% of total calories for hormonal health
  const minFatCals = calorieNeed * 0.20;
  const minFatGrams = Math.ceil(minFatCals / 9);
  if (fat * 9 < minFatCals) {
    fat = minFatGrams;
  }

  // Calculate remaining calories for carbs
  const proteinCals = protein * 4;
  const fatCals = fat * 9;
  const remainingCals = calorieNeed - (proteinCals + fatCals);
  carbs = Math.max(0, Math.round(remainingCals / 4));

  // Validation: ensure macros don't exceed total calories
  const totalMacroCals = proteinCals + fatCals + (carbs * 4);
  if (totalMacroCals > calorieNeed) {
    // Adjust carbs if total exceeds calorie target
    carbs = Math.max(0, Math.round((calorieNeed - proteinCals - fatCals) / 4));
  }

  // Ensure all values are valid numbers
  if (isNaN(calorieNeed) || isNaN(maintenanceCalories) || isNaN(activityCalories) ||
      isNaN(bmr) || isNaN(tdee) || isNaN(protein) || isNaN(carbs) || isNaN(fat)) {
    console.error('Invalid calculation values detected');
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          <div className={styles.resultBox}>
            <h2>Calculation Error</h2>
            <p>There was an error with the calculation. Please go back and try again.</p>
            <button className={styles.newButton} onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const pieData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: [protein, carbs, fat],
      backgroundColor: ['#D43BF6', '#47CF73', '#FFD93D'],
      borderWidth: 0,
    }],
  };

  // Function to save calculation to database
  const handleSave = async () => {
    if (!user) {
      // Redirect to login if not logged in
      router.push('/auth/login?callbackUrl=' + encodeURIComponent(window.location.href));
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/calories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalInfo: {
            age,
            weight: parseFloat(params.get('weight')),
            weightUnit,
            height: parseFloat(params.get('height')),
            heightUnit,
            gender,
            activity,
            goal,
          },
          results: {
            calorieNeed: calorieNeed || 0,
            maintenanceCalories: maintenanceCalories || 0,
            activityCalories: activityCalories || 0,
            bmr: Math.round(bmr) || 0,
            tdee: Math.round(tdee) || 0,
            protein: protein || 0,
            carbs: carbs || 0,
            fat: fat || 0,
            deficitInfo: deficitInfo || '',
            // Include legacy field for backward compatibility
            calorieBurn: activityCalories || 0,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaveMessage('Calculation saved successfully!');
        // Redirect to home page after a short delay to show the success message
        setTimeout(() => router.push('/home'), 1500);
      } else {
        console.error('Save failed:', data);
        let errorMessage = data.error || 'Failed to save';
        if (data.details) {
          errorMessage += ` - ${data.details}`;
        }
        if (data.validationErrors) {
          console.error('Validation errors:', data.validationErrors);
          errorMessage += ' (Check console for details)';
        }
        setSaveMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setSaveMessage('Error saving calculation. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <div className={styles.resultBox}>
          <div className={styles.headerRow}>
            <h2>Your Daily Calorie And Macro Nutrient Needs</h2>
            <div>
              <button className={styles.newButton} onClick={() => window.history.back()}>Back</button>
              <button className={styles.newButton} onClick={() => router.push('/')}>Home</button>
            </div>
          </div>

          <div className={styles.calorieInfo}>
            <p><strong>Daily Calorie Target:</strong> {calorieNeed} calories</p>
            <p><strong>Maintenance Calories:</strong> {maintenanceCalories} calories</p>
            <p><strong>Activity Calories:</strong> {activityCalories} calories</p>
            <p className={styles.goalInfo}>
              <strong>Goal:</strong> {goal.charAt(0).toUpperCase() + goal.slice(1)} ({deficitInfo})
            </p>
          </div>

          <div className={styles.macroBreakdown}>
            <div>
              <h3>Daily Macronutrient Targets</h3>
              <p><span className={styles.protein}>Protein:</span> {protein}g ({Math.round((protein * 4 / calorieNeed) * 100)}%)</p>
              <p><span className={styles.carbs}>Carbs:</span> {carbs}g ({Math.round((carbs * 4 / calorieNeed) * 100)}%)</p>
              <p><span className={styles.fat}>Fat:</span> {fat}g ({Math.round((fat * 9 / calorieNeed) * 100)}%)</p>
              <p className={styles.description}>
                These macronutrient targets are optimized for your <strong>{goal}</strong> goal and provide balanced nutrition.
              </p>
            </div>
            <div className={styles.pieChart}>
              <Pie data={pieData} />
            </div>
          </div>

          {saveMessage && (
            <p className={styles.saveMessage}>{saveMessage}</p>
          )}

          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CalorieResultPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalorieResultContent />
    </Suspense>
  );
};

export default CalorieResultPage;
