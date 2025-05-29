'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SeatedBarbellPressPage = () => {
  const exercise = {
    id: 'seated_barbell_press',
    title: 'Seated Barbell Press',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/seated_barbell_press',
    embedUrl: 'https://www.youtube.com/embed/IuzRCN6eG6Y?si=gVvBREY9HCE_M_-W',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/IuzRCN6eG6Y?si=gVvBREY9HCE_M_-W"
            title="Seated Barbell Press"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Seated Barbell Press</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Seated Barbell Press is a classic compound movement for building overall shoulder mass and strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Anterior Deltoids, Lateral Deltoids, Triceps</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 6-10 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit on a bench with back support and grip the barbell slightly wider than shoulder-width.</li>
              <li>Unrack the bar and press it overhead until your arms are fully extended.</li>
              <li>Lower the bar to just below chin level in a controlled motion.</li>
              <li>Press the bar back up to the starting position and repeat.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Shoulder Press or Machine Shoulder Press</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeatedBarbellPressPage; 