'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../../../styles/PersonalForm.module.css';

const PersonalInfoForm = () => {
  const [goal, setGoal] = useState('');

  return (
    <div className={styles.pageWrapper}>
      {/* Navbar included inside background */}
      <Navbar />

      {/* Main content area with form */}
      <main className={styles.page}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Calorie Tracker</h2>
          <p className={styles.formSubtitle}>Enter your detail to calculate your daily needs</p>

          <form className={styles.form}>
            {/* Age */}
            <input type="number" placeholder="Age" className={styles.input} />

            {/* Weight and unit */}
            <div className={styles.inputGroup}>
              <input type="number" placeholder="Weight" className={styles.input} />
              <select className={styles.unitSelect}>
                <option>Kg</option>
                <option>lb</option>
              </select>
            </div>

            {/* Height and unit */}
            <div className={styles.inputGroup}>
              <input type="number" placeholder="Height" className={styles.input} />
              <select className={styles.unitSelect}>
                <option>Cm</option>
                <option>Inch</option>
              </select>
            </div>

            {/* Gender */}
            <select className={styles.dropdown}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Activity level */}
            <select className={styles.dropdown}>
              <option value="">Activity Level</option>
              <option value="light">Lightly Active</option>
              <option value="active">Active</option>
              <option value="very_active">Very Active</option>
            </select>

            {/* Goal radio buttons */}
            <div className={styles.goalSection}>
              <label className={styles.goalLabel}>Goal</label>
              <div className={styles.goalOptions}>
                <label>
                  <input
                    type="radio"
                    name="goal"
                    value="cut"
                    checked={goal === 'cut'}
                    onChange={() => setGoal('cut')}
                  />
                  Cut
                </label>
                <label>
                  <input
                    type="radio"
                    name="goal"
                    value="bulk"
                    checked={goal === 'bulk'}
                    onChange={() => setGoal('bulk')}
                  />
                  Bulk
                </label>
                <label>
                  <input
                    type="radio"
                    name="goal"
                    value="maintain"
                    checked={goal === 'maintain'}
                    onChange={() => setGoal('maintain')}
                  />
                  Maintain
                </label>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className={styles.nextBtn}>
              Next
            </button>
          </form>
        </div>
      </main>

      {/* Footer outside background */}
      <Footer />
    </div>
  );
};

export default PersonalInfoForm;
