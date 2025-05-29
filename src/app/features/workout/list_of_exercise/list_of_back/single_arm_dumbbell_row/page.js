'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SingleArmDumbbellRowPage = () => {
  const router = useRouter();

  // Exercise data
  const exercise = {
    id: 'single_arm_dumbbell_row',
    title: 'Single Arm Dumbbell Row',
    category: 'back',
    path: '/features/workout/list_of_exercise/list_of_back/single_arm_dumbbell_row',
    embedUrl: 'https://www.youtube.com/embed/DMo3HJoawrU?si=rFoE_YOSHgfSe6il',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/DMo3HJoawrU?si=rFoE_YOSHgfSe6il"
            title="Single Arm Dumbbell Row"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Single Arm Dumbbell Row</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Single Arm Dumbbell Row is a unilateral exercise that helps build back thickness and correct muscle imbalances.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats, Rhomboids, Lower Back</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps per arm</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Place one knee and hand on a bench, keeping your back flat.</li>
              <li>With the other hand, row the dumbbell towards your hip, squeezing your back at the top.</li>
              <li>Lower the dumbbell in a controlled manner and repeat.</li>
              <li>Switch arms after completing the set.</li>
            </ul>
            <p><strong>Alternative:</strong> Bent Over Barbell Row or Seated Cable Row</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleArmDumbbellRowPage; 