'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const RopeCrunchesPage = () => {
  // Exercise data
  const exercise = {
    id: 'rope_crunches',
    title: 'Rope Crunches',
    category: 'core',
    path: '/features/workout/list_of_exercise/list_of_core/rope_crunches',
    embedUrl: 'https://www.youtube.com/embed/6GMKPQVERzw?si=q8q6U1qRE2QKG9R1',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/6GMKPQVERzw?si=q8q6U1qRE2QKG9R1"
            title="Rope Crunches"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Rope Crunches</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Rope crunches are a cable-based core exercise that provides constant tension throughout the movement. This exercise effectively targets the abdominals and allows for progressive overload.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Upper Abs, Core Stabilizers</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 15-25 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Kneel in front of a cable machine with a rope attachment set at high position.</li>
              <li>Hold the rope with both hands beside your head.</li>
              <li>Crunch down by flexing your spine and bringing your elbows toward your knees.</li>
              <li>Focus on contracting your abs and avoid using your arms to pull the weight.</li>
              <li>Slowly return to the starting position with control.</li>
            </ul>
            <p><strong>Alternative:</strong> Cable Crunches, Machine Crunches</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RopeCrunchesPage;
