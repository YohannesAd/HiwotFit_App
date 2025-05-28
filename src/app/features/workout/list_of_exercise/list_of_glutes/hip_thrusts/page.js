'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const HipThrustsPage = () => {
  // Exercise data
  const exercise = {
    id: 'hip_thrusts',
    title: 'Hip Thrusts',
    category: 'glutes',
    path: '/features/workout/list_of_exercise/list_of_glutes/hip_thrusts',
    embedUrl: 'https://www.youtube.com/embed/EF7jXP17DPE?si=dOGKSWoWlya5IY1V',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/EF7jXP17DPE?si=dOGKSWoWlya5IY1V"
            title="Hip Thrusts"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Hip Thrusts</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Hip thrusts are one of the most effective exercises for building glute strength and size. This exercise specifically targets the gluteus maximus and helps improve hip extension power, which is crucial for athletic performance.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gluteus Maximus, Hamstrings, Core</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit with your upper back against a bench, feet flat on the floor.</li>
              <li>Place a barbell or weight across your hips (use a pad for comfort).</li>
              <li>Keep your knees bent at about 90 degrees throughout the movement.</li>
              <li>Drive through your heels and squeeze your glutes to lift your hips up.</li>
              <li>Raise your hips until your body forms a straight line from knees to shoulders.</li>
              <li>Pause briefly at the top and squeeze your glutes hard.</li>
              <li>Lower your hips slowly and with control back to the starting position.</li>
              <li>Keep your core engaged and avoid arching your back excessively.</li>
            </ul>
            <p><strong>Alternative:</strong> Glute Bridges, Single Leg Hip Thrusts, Machine Hip Thrusts</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HipThrustsPage;
