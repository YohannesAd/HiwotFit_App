'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/PersonalForm.module.css';

const PersonalInfoForm = () => {
  const router = useRouter();

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');

  // Get activity level description based on selected value
  const getActivityDescription = () => {
    switch(activity) {
      case 'sedentary':
        return "Little or no exercise, desk job";
      case 'light':
        return "Light exercise or sports 1-3 days/week";
      case 'moderate':
        return "Moderate exercise or sports 3-5 days/week";
      case 'very_active':
        return "Hard exercise or sports 6-7 days/week";
      case 'extremely_active':
        return "Hard daily exercise or sports and physical job or twice daily training";
      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate height in the appropriate unit
    let finalHeight = height;
    let finalHeightUnit = heightUnit;

    if (heightUnit === 'ft/in') {
      // Convert feet and inches to total inches
      const totalInches = (parseInt(feet) * 12) + parseInt(inches || 0);
      finalHeight = totalInches;
      finalHeightUnit = 'inch'; // Use inches for the calculation
    }

    const params = new URLSearchParams({
      age,
      weight,
      weightUnit,
      height: finalHeight,
      heightUnit: finalHeightUnit,
      gender,
      activity,
      goal,
    });

    router.push(`/features/calories/calorie_result?${params.toString()}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Calorie Tracker</h2>
          <p className={styles.formSubtitle}>Enter your detail to calculate your daily needs</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className={styles.input} required />

            <div className={styles.inputGroup}>
              <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} className={styles.input} required />
              <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} className={styles.unitSelect}>
                <option value="kg">Kg</option>
                <option value="lb">lb</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              {heightUnit !== 'ft/in' ? (
                <input
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={styles.input}
                  required={heightUnit !== 'ft/in'}
                />
              ) : (
                <div className={styles.feetInchInputs}>
                  <input
                    type="number"
                    placeholder="Feet"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className={styles.feetInput}
                    required={heightUnit === 'ft/in'}
                  />
                  <input
                    type="number"
                    placeholder="Inches"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className={styles.inchesInput}
                    required={heightUnit === 'ft/in'}
                  />
                </div>
              )}
              <select
                value={heightUnit}
                onChange={(e) => {
                  setHeightUnit(e.target.value);
                  // Reset height values when changing units
                  if (e.target.value === 'ft/in') {
                    setHeight('');
                  } else {
                    setFeet('');
                    setInches('');
                  }
                }}
                className={styles.unitSelect}
              >
                <option value="cm">Cm</option>
                <option value="ft/in">Ft/In</option>
              </select>
            </div>

            <select value={gender} onChange={(e) => setGender(e.target.value)} className={styles.dropdown} required>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <div className={styles.selectWithTooltip}>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className={styles.dropdown}
                required
              >
                <option value="">Activity Level</option>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="very_active">Very Active</option>
                <option value="extremely_active">Extremely Active</option>
              </select>
              {activity && (
                <div className={styles.tooltipText}>
                  {getActivityDescription()}
                </div>
              )}
            </div>

            <div className={styles.goalSection}>
              <label className={styles.goalLabel}>Goal</label>
              <div className={styles.goalOptions}>
                <label><input type="radio" name="goal" value="cut" checked={goal === 'cut'} onChange={() => setGoal('cut')} required /> Cut</label>
                <label><input type="radio" name="goal" value="bulk" checked={goal === 'bulk'} onChange={() => setGoal('bulk')} /> Bulk</label>
                <label><input type="radio" name="goal" value="maintain" checked={goal === 'maintain'} onChange={() => setGoal('maintain')} /> Maintain</label>
              </div>
            </div>

            <button type="submit" className={styles.nextBtn}>Next</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PersonalInfoForm;
