'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineLateralRaisePage = () => {
  const exercise = {
    id: 'machine_lateral_raise',
    title: 'Machine Lateral Raise',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/machine_lateral_raise',
    embedUrl: 'https://www.youtube.com/embed/0o07iGKUarI?si=A-Q6Wo7H0E5jbM7G',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/0o07iGKUarI?si=A-Q6Wo7H0E5jbM7G"
            title="Machine Lateral Raise"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Lateral Raise</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Machine Lateral Raise isolates the side delts, allowing for controlled and consistent resistance throughout the movement.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lateral Deltoids</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Adjust the seat and pads so your arms are aligned with the machine&apos;s levers.</li>
              <li>Grip the handles or rest your arms against the pads.</li>
              <li>Raise your arms out to the sides until they&apos;re parallel to the floor.</li>
              <li>Lower with control and repeat.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Lateral Raise or Leaning Cable Lateral Raise</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineLateralRaisePage; 