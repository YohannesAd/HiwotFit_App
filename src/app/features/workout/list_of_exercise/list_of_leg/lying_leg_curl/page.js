'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const LyingLegCurlPage = () => {
  // Exercise data
  const exercise = {
    id: 'lying_leg_curl',
    title: 'Lying Leg Curl',
    category: 'leg',
    path: '/features/workout/list_of_exercise/list_of_leg/lying_leg_curl',
    embedUrl: 'https://www.youtube.com/embed/n5WDXD_mpVY?si=J-92C9UT_A2CNTl8',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/n5WDXD_mpVY?si=J-92C9UT_A2CNTl8"
            title="Lying Leg Curl"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Lying Leg Curl</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The lying leg curl isolates the hamstrings, making it an essential exercise for balanced leg development. It helps improve knee stability and athletic performance.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Hamstrings</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Lie face down on the leg curl machine with the pad positioned just above your heels.</li>
              <li>Grasp the handles or sides of the bench for stability.</li>
              <li>Keeping your hips pressed into the bench, curl your legs up by flexing at the knees.</li>
              <li>Squeeze your hamstrings at the top of the movement.</li>
              <li>Slowly lower your legs back to the starting position with control.</li>
              <li>Avoid using momentum or lifting your hips off the bench.</li>
            </ul>
            <p><strong>Alternative:</strong> Seated Leg Curl, Swiss Ball Leg Curl</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LyingLegCurlPage;