'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const BarbellCurlNarrowPage = () => {
  // Exercise data
  const exercise = {
    id: 'barbell_curl_narrow',
    title: 'Barbell Curl (Narrow Grip)',
    category: 'biceps',
    path: '/features/workout/list_of_exercise/list_of_biceps/barbell_curl_narrow',
    embedUrl: 'https://www.youtube.com/embed/pUS6HBQjRmc?si=_1r-ueq5y5PD88Ls',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/pUS6HBQjRmc?si=_1r-ueq5y5PD88Ls"
            title="Barbell Curl (Narrow Grip)"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Barbell Curl (Narrow Grip)</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The narrow grip barbell curl targets the biceps with greater emphasis on the outer head. This variation helps develop peak and overall bicep thickness.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Biceps (Outer Head)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand with feet shoulder-width apart, holding a barbell with a narrow grip (hands closer than shoulder width).</li>
              <li>Keep your elbows close to your sides and your upper arms stationary.</li>
              <li>Curl the barbell up toward your shoulders while contracting your biceps.</li>
              <li>Pause briefly at the top of the movement, then slowly lower the weight back to the starting position.</li>
              <li>Maintain proper form throughout the exercise, avoiding swinging or using momentum.</li>
            </ul>
            <p><strong>Alternative:</strong> EZ Bar Curl, Dumbbell Curl</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BarbellCurlNarrowPage;