'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SingleLegHipThrustsPage = () => {
  // Exercise data
  const exercise = {
    id: 'single_leg_hip_thrusts',
    title: 'Single Leg Hip Thrusts',
    category: 'glutes',
    path: '/features/workout/list_of_exercise/list_of_glutes/single_leg_hip_thrusts',
    embedUrl: 'https://www.youtube.com/embed/lzDgRRuBdqY?si=lLQNWLLF9WT4AeQS',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/lzDgRRuBdqY?si=lLQNWLLF9WT4AeQS"
            title="Single Leg Hip Thrusts"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Single Leg Hip Thrusts</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Single leg hip thrusts are an advanced unilateral exercise that targets each glute individually. This variation helps address muscle imbalances, improves stability, and provides an intense glute workout using just bodyweight or light resistance.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gluteus Maximus, Hamstrings, Core, Hip Stabilizers</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-15 Reps (each leg)</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit with your upper back against a bench, feet flat on the floor.</li>
              <li>Extend one leg straight out in front of you, keeping it elevated.</li>
              <li>Keep the working leg&apos;s knee bent at about 90 degrees.</li>
              <li>Drive through the heel of your working leg to lift your hips up.</li>
              <li>Raise your hips until your body forms a straight line from knee to shoulder.</li>
              <li>Pause briefly at the top and squeeze your glute hard.</li>
              <li>Lower your hips slowly and with control back to the starting position.</li>
              <li>Complete all reps on one side before switching to the other leg.</li>
            </ul>
            <p><strong>Alternative:</strong> Single Leg Glute Bridges, Bulgarian Split Squats, Single Leg Deadlifts</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleLegHipThrustsPage;
