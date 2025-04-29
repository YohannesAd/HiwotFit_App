'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/calorie_calculation_result.module.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CalorieResultPage = () => {
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

  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  let multiplier = 1.2; // Default (sedentary)
  if (activity === 'light') multiplier = 1.375;
  else if (activity === 'moderate') multiplier = 1.55;
  else if (activity === 'very_active') multiplier = 1.725;
  else if (activity === 'extremely_active') multiplier = 1.9;

  let tdee = bmr * multiplier;

  if (goal === 'cut') tdee -= 500;
  if (goal === 'bulk') tdee += 500;

  const calorieNeed = Math.round(tdee);
  const calorieBurn = Math.round(tdee * 0.12);

  const protein = Math.round(weight * 2);
  const fat = Math.round(weight * 0.8);
  const proteinCals = protein * 4;
  const fatCals = fat * 9;
  const remainingCals = calorieNeed - (proteinCals + fatCals);
  const carbs = Math.round(remainingCals / 4);

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
            calorieNeed,
            calorieBurn,
            protein,
            carbs,
            fat,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaveMessage('Calculation saved successfully!');
        // Optionally redirect to dashboard after a delay
        // setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setSaveMessage(`Error: ${data.error || 'Failed to save'}`);
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

          <p><strong>Calorie needed:</strong> {calorieNeed}</p>
          <p><strong>Calorie Burn:</strong> {calorieBurn}</p>

          <div className={styles.macroBreakdown}>
            <div>
              <p><span className={styles.protein}>Protein:</span> {protein}g</p>
              <p><span className={styles.carbs}>Carbs:</span> {carbs}g</p>
              <p><span className={styles.fat}>Fat:</span> {fat}g</p>
              <p className={styles.description}>
                To achieve your goal of <strong>{goal}</strong>, consume approximately {calorieNeed} calories daily.
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

export default CalorieResultPage;
