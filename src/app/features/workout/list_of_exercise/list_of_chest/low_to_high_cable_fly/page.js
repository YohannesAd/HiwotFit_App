'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const LowToHighCableFlyPage = () => {
  // Exercise data
  const exercise = {
    id: 'low_to_high_cable_fly',
    title: 'Low to High Cable Fly',
    category: 'chest',
    path: '/features/workout/list_of_exercise/list_of_chest/low_to_high_cable_fly',
    embedUrl: 'https://www.youtube.com/embed/e_8HLu59-to?si=lvdOabWM9i9Asebc',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/e_8HLu59-to?si=lvdOabWM9i9Asebc"
            title="Low to High Cable Fly"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Low to High Cable Fly</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The low to high cable fly targets the upper chest muscles and front deltoids. This exercise helps develop definition in the upper portion of the pectorals and improves overall chest development with an upward motion pattern.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Upper Chest</p>
            <p><strong>Equipment:</strong> Cable Machine</p>
            <p><strong>Difficulty:</strong> Intermediate</p>
            <p><strong>Type:</strong> Isolation</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LowToHighCableFlyPage;
