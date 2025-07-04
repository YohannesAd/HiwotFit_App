'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const CableTricepsPushdownPage = () => {
  // Exercise data
  const exercise = {
    id: 'cable_triceps_pushdown',
    title: 'Cable Triceps Push Down',
    category: 'triceps',
    path: '/features/workout/list_of_exercise/list_of_triceps/cable_triceps_pushdown',
    embedUrl: 'https://www.youtube.com/embed/6Fzep104f0s?si=aW_GJjkKZGTLvKWu',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/6Fzep104f0s?si=aW_GJjkKZGTLvKWu"
            title="Cable Triceps Push Down"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Cable Triceps Push Down</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The cable triceps pushdown is an isolation exercise that effectively targets all three heads of the triceps. It&apos;s a staple movement for developing arm definition and strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Triceps (All Three Heads)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand facing a cable machine with a straight bar attachment set at upper chest height.</li>
              <li>Grasp the bar with an overhand grip (palms facing down), hands shoulder-width apart.</li>
              <li>Keep your upper arms close to your body and perpendicular to the floor.</li>
              <li>Starting with your elbows at 90 degrees, push the bar down by extending your elbows until your arms are straight.</li>
              <li>Squeeze your triceps at the bottom of the movement.</li>
              <li>Slowly return to the starting position, controlling the weight throughout.</li>
              <li>Keep your torso upright and avoid using momentum to move the weight.</li>
            </ul>
            <p><strong>Alternative:</strong> V-Bar Pushdown, Rope Pushdown</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CableTricepsPushdownPage;
