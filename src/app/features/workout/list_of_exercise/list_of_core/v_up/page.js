'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const VUpPage = () => {
  // Exercise data
  const exercise = {
    id: 'v_up',
    title: 'V-up',
    category: 'core',
    path: '/features/workout/list_of_exercise/list_of_core/v_up',
    embedUrl: 'https://www.youtube.com/embed/BIOM5eSsJ_8?si=CYQy124uqien-K83',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/BIOM5eSsJ_8?si=CYQy124uqien-K83"
            title="V-up"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>V-up</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            V-ups are a challenging core exercise that targets both the upper and lower abdominals simultaneously. This exercise helps improve core strength, stability, and coordination.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Upper & Lower Abs, Hip Flexors</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 12-20 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Lie flat on your back with arms extended overhead and legs straight.</li>
              <li>Simultaneously lift your torso and legs, reaching your hands toward your feet.</li>
              <li>Form a &quot;V&quot; shape with your body at the top of the movement.</li>
              <li>Slowly lower back to the starting position with control.</li>
              <li>Keep your core engaged throughout the entire movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Modified V-ups (bent knees), Russian Twists</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VUpPage;
