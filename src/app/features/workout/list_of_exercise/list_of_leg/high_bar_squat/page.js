'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const HighBarSquatPage = () => {
  // Exercise data
  const exercise = {
    id: 'high_bar_squat',
    title: 'High Bar Squat',
    category: 'leg',
    path: '/features/workout/list_of_exercise/list_of_leg/high_bar_squat',
    embedUrl: 'https://www.youtube.com/embed/i7J5h7BJ07g?si=K-6WnLuR67HxgqQA',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/i7J5h7BJ07g?si=K-6WnLuR67HxgqQA"
            title="High Bar Squat"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>High Bar Squat</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The high bar squat is a compound exercise that primarily targets the quadriceps while also engaging the glutes, hamstrings, and core. It's a fundamental movement for building lower body strength and muscle mass.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Quadriceps, Glutes, Hamstrings, Core</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-5 Sets of 5-10 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Position the barbell on the squat rack at upper chest height.</li>
              <li>Step under the bar and place it across your upper traps (not on your neck).</li>
              <li>Grip the bar slightly wider than shoulder-width apart.</li>
              <li>Unrack the bar and step back, positioning your feet shoulder-width apart with toes slightly pointed out.</li>
              <li>Brace your core, keep your chest up, and initiate the movement by bending at the knees and hips.</li>
              <li>Lower your body until your thighs are at least parallel to the ground.</li>
              <li>Drive through your heels to return to the starting position, keeping your back straight throughout.</li>
              <li>Keep your knees in line with your toes and avoid letting them cave inward.</li>
            </ul>
            <p><strong>Alternative:</strong> Front Squat, Hack Squat</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HighBarSquatPage;