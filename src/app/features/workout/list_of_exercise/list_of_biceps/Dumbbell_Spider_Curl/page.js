'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Each_exercise.module.css';

const DumbbellSpiderCurlPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/ke2shAeQ0O8?si=Q1DjJymOYUU13Er9"
            title="Dumbbell Spider Curl"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.title}>Dumbbell Spider Curl</h2>
          <p className={styles.description}>
            The dumbbell spider curl is performed on an incline bench facing downward, which isolates the biceps and minimizes body momentum. This exercise helps develop the peak of the biceps.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Biceps (Short Head)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Set an incline bench to approximately 45 degrees.</li>
              <li>Lie face down on the bench with your chest supported and arms hanging straight down.</li>
              <li>Hold a dumbbell in each hand with palms facing forward.</li>
              <li>Curl the weights up toward your shoulders while keeping your upper arms stationary.</li>
              <li>Squeeze your biceps at the top, then slowly lower the weights back to the starting position.</li>
              <li>Focus on controlled movement and avoid using momentum.</li>
            </ul>
            <p><strong>Alternative:</strong> Preacher Curl, Concentration Curl</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DumbbellSpiderCurlPage;