'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const HangingKneeRaisesPage = () => {
  // Exercise data
  const exercise = {
    id: 'hanging_knee_raises',
    title: 'Hanging Knee Raises',
    category: 'core',
    path: '/features/workout/list_of_exercise/list_of_core/hanging_knee_raises',
    embedUrl: 'https://www.youtube.com/embed/RD_A-Z15ER4?si=yDqpOeTuCzDUBlhM',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/RD_A-Z15ER4?si=yDqpOeTuCzDUBlhM"
            title="Hanging Knee Raises"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Hanging Knee Raises</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Hanging knee raises are an excellent core exercise that targets the lower abdominals and hip flexors. This exercise helps build core strength and stability while improving grip strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lower Abs, Hip Flexors</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Hang from a pull-up bar with arms fully extended and shoulders engaged.</li>
              <li>Keep your core tight and avoid swinging your body.</li>
              <li>Slowly raise your knees toward your chest by flexing your hips and abs.</li>
              <li>Pause briefly at the top, then slowly lower your legs back to starting position.</li>
              <li>Control the movement throughout the entire range of motion.</li>
            </ul>
            <p><strong>Alternative:</strong> Knee Raises on Captain&apos;s Chair, Lying Leg Raises</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HangingKneeRaisesPage;
