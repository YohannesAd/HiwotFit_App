'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const HammerHighRowPage = () => {
  const router = useRouter();

  // Exercise data
  const exercise = {
    id: 'hammer_high_row',
    title: 'Hammer High Row',
    category: 'back',
    path: '/features/workout/list_of_exercise/list_of_back/hammer_high_row',
    embedUrl: 'https://www.youtube.com/embed/gg5hwJuv6KI?si=bR5u69e7miWfNbwy',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/gg5hwJuv6KI?si=bR5u69e7miWfNbwy"
            title="Hammer High Row"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Hammer High Row</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Hammer High Row is a powerful machine-based exercise that targets the upper and mid-back, helping to build thickness and strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats, Rhomboids, Upper Back</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit on the machine and grip the handles with a neutral grip.</li>
              <li>Pull the handles towards your torso, squeezing your shoulder blades together.</li>
              <li>Pause briefly, then slowly return to the starting position.</li>
              <li>Keep your chest up and core engaged throughout the movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Seated Cable Row or Barbell Row</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HammerHighRowPage; 