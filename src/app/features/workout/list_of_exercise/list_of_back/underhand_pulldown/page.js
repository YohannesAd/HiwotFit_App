'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const UnderhandPulldownPage = () => {
  const router = useRouter();

  // Exercise data
  const exercise = {
    id: 'underhand_pulldown',
    title: 'Underhand Pulldown',
    category: 'back',
    path: '/features/workout/list_of_exercise/list_of_back/underhand_pulldown',
    embedUrl: 'https://www.youtube.com/embed/VprlTxpB1rk?si=1WJA-FlpbXCAcBAO',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/VprlTxpB1rk?si=1WJA-FlpbXCAcBAO"
            title="Underhand Pulldown"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Underhand Pulldown</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Underhand Pulldown is a variation of the lat pulldown that emphasizes the lower lats and biceps.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats (lower), Biceps, Middle Back</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit at a lat pulldown machine and grip the bar with an underhand (supinated) grip, hands shoulder-width apart.</li>
              <li>Pull the bar down to your upper chest, squeezing your lats and keeping your elbows close to your body.</li>
              <li>Slowly return the bar to the starting position with control.</li>
              <li>Keep your torso upright and avoid using momentum.</li>
            </ul>
            <p><strong>Alternative:</strong> Chin-Up or Close-Grip Pulldown</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnderhandPulldownPage; 