'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const InclineDumbbellRowPage = () => {
  const router = useRouter();

  // Exercise data
  const exercise = {
    id: 'incline_dumbbell_row',
    title: 'Incline Dumbbell Row',
    category: 'back',
    path: '/features/workout/list_of_exercise/list_of_back/incline_dumbbell_row',
    embedUrl: 'https://www.youtube.com/embed/tZUYS7X50so?si=4nYlsTJBCU865XZ4',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/tZUYS7X50so?si=4nYlsTJBCU865XZ4"
            title="Incline Dumbbell Row"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Incline Dumbbell Row</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Incline Dumbbell Row is an effective exercise for targeting the upper and mid-back while minimizing lower back strain.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats, Rhomboids, Rear Delts</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Set an incline bench to about 30-45 degrees and lie face down with a dumbbell in each hand.</li>
              <li>Let your arms hang straight down, palms facing each other.</li>
              <li>Row the dumbbells up towards your hips, squeezing your shoulder blades together.</li>
              <li>Lower the weights back down in a controlled manner and repeat.</li>
            </ul>
            <p><strong>Alternative:</strong> Chest-Supported Row Machine or Barbell Row</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InclineDumbbellRowPage; 