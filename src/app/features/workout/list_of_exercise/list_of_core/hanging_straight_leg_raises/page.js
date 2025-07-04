'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const HangingStraightLegRaisesPage = () => {
  // Exercise data
  const exercise = {
    id: 'hanging_straight_leg_raises',
    title: 'Hanging Straight Leg Raises',
    category: 'core',
    path: '/features/workout/list_of_exercise/list_of_core/hanging_straight_leg_raises',
    embedUrl: 'https://www.youtube.com/embed/7FwGZ8qY5OU?si=sncwvP1uUS3N7U5X',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/7FwGZ8qY5OU?si=sncwvP1uUS3N7U5X"
            title="Hanging Straight Leg Raises"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Hanging Straight Leg Raises</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Hanging straight leg raises are an advanced core exercise that targets the lower abs and hip flexors. This exercise requires significant core strength and grip strength to perform correctly.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lower Rectus Abdominis, Hip Flexors, Obliques</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Hang from a pull-up bar with an overhand grip, hands shoulder-width apart.</li>
              <li>Keep your legs straight and together throughout the movement.</li>
              <li>Engage your core and slowly raise your legs until they&apos;re parallel to the floor or higher.</li>
              <li>Pause briefly at the top of the movement.</li>
              <li>Lower your legs slowly and with control back to the starting position.</li>
              <li>Avoid swinging or using momentum to complete the movement.</li>
              <li>Keep your shoulders engaged and avoid hanging passively.</li>
            </ul>
            <p><strong>Alternative:</strong> Hanging Knee Raises, Captain&apos;s Chair Leg Raises, Lying Leg Raises</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HangingStraightLegRaisesPage;
