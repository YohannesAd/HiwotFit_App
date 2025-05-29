'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const LeaningCableLateralRaisePage = () => {
  const exercise = {
    id: 'leaning_cable_lateral_raise',
    title: 'Leaning Cable Lateral Raise',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/leaning_cable_lateral_raise',
    embedUrl: 'https://www.youtube.com/embed/lq7eLC30b9w?si=P3LWnObYorOWFx8V',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/lq7eLC30b9w?si=P3LWnObYorOWFx8V"
            title="Leaning Cable Lateral Raise"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Leaning Cable Lateral Raise</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Leaning Cable Lateral Raise increases the range of motion and tension on the side delts for better shoulder development.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lateral Deltoids</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand next to a low cable and hold the handle with the outside hand.</li>
              <li>Lean away from the machine to increase the stretch on your delt.</li>
              <li>Raise your arm out to the side until it&apos;s parallel to the floor.</li>
              <li>Lower with control and repeat. Switch sides after each set.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Lateral Raise or Machine Lateral Raise</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaningCableLateralRaisePage; 