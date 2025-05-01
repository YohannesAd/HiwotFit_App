'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const InclineDumbbellCurlPage = () => {
  // Exercise data
  const exercise = {
    id: 'incline_dumbbell_curl',
    title: 'Incline Dumbbell Curl',
    category: 'biceps',
    path: '/features/workout/list_of_exercise/list_of_biceps/incline_dumbbell_curl',
    embedUrl: 'https://www.youtube.com/embed/aTYlqC_JacQ?si=IW_zQGPPuWmm4vGk',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/aTYlqC_JacQ?si=IW_zQGPPuWmm4vGk"
            title="Incline Dumbbell Curl"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Incline Dumbbell Curl</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The incline dumbbell curl places the biceps in a stretched position, targeting the long head of the biceps more effectively. This exercise helps develop fuller, more complete biceps.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Biceps (Long Head)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Set an incline bench to approximately 45-60 degrees.</li>
              <li>Sit back on the bench with a dumbbell in each hand, arms hanging straight down.</li>
              <li>Keeping your upper arms stationary, curl the weights up while contracting your biceps.</li>
              <li>Pause briefly at the top of the movement, then slowly lower the weights back to the starting position.</li>
              <li>Focus on full range of motion and avoid swinging the weights.</li>
            </ul>
            <p><strong>Alternative:</strong> Incline Hammer Curl, Cable Curl</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InclineDumbbellCurlPage;