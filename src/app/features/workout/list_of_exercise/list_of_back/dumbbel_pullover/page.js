'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const DumbbellPulloverPage = () => {
  const router = useRouter();

  // Exercise data
  const exercise = {
    id: 'dumbbell_pullover',
    title: 'Dumbbell Pullover',
    category: 'back',
    path: '/features/workout/list_of_exercise/list_of_back/dumbbel_pullover',
    embedUrl: 'https://www.youtube.com/embed/jQjWlIwG4sI?si=0l7Ip5uFvWos8e5o',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/jQjWlIwG4sI?si=0l7Ip5uFvWos8e5o"
            title="Dumbbell Pullover"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Dumbbell Pullover</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The dumbbell pullover works both the chest and the lats, depending on form. It’s a great isolation movement that stretches the upper body.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats, Chest</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Lie on a flat bench, holding a dumbbell with both hands above your chest.</li>
              <li>Slowly lower the dumbbell behind your head while keeping your arms slightly bent.</li>
              <li>Stretch until your arms are aligned with your body, then return to starting position.</li>
              <li>Focus on controlled movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Barbell Pullover</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DumbbellPulloverPage;
