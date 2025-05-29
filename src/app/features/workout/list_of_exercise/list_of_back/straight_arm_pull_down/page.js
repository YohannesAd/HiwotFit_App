'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const StraightArmPullDownPage = () => {
  const router = useRouter();

  // Exercise data
  const exercise = {
    id: 'straight_arm_pull_down',
    title: 'Straight Arm Pull Down',
    category: 'back',
    path: '/features/workout/list_of_exercise/list_of_back/straight_arm_pull_down',
    embedUrl: 'https://www.youtube.com/embed/G9uNaXGTJ4w?si=EisrB47rv1OzoUfw',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/G9uNaXGTJ4w?si=EisrB47rv1OzoUfw"
            title="Straight Arm Pull Down"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Straight Arm Pull Down</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Straight Arm Pull Down is an isolation exercise that targets the lats and helps improve the mind-muscle connection.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats, Teres Major, Triceps (long head)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand facing a cable machine with a straight bar attached to the high pulley.</li>
              <li>With arms straight, pull the bar down in an arc to your thighs, keeping elbows slightly bent.</li>
              <li>Squeeze your lats at the bottom, then slowly return to the start.</li>
              <li>Keep your core tight and avoid swinging.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Pullover or Resistance Band Straight Arm Pulldown</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StraightArmPullDownPage; 