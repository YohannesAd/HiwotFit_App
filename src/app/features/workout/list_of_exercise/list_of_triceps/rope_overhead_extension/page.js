'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Each_exercise.module.css';

const RopeOverheadExtensionPage = () => {
  return ( 
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/kqidUIf1eJE?si=5rO9-2VthUUCpJ1Q"
            title="Rope Overhead Triceps Extension"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.title}>Rope Overhead Triceps Extension</h2>
          <p className={styles.description}>
            The rope overhead triceps extension emphasizes the long head of the triceps. This exercise provides a deep stretch and full contraction, making it excellent for building triceps size and strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Triceps (Long Head)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand facing away from a cable machine with a rope attachment set at the lowest position.</li>
              <li>Grasp the rope with both hands and position yourself a step or two away from the machine.</li>
              <li>Raise your arms overhead with elbows pointing forward and hands behind your head.</li>
              <li>Keeping your upper arms stationary and close to your ears, extend your elbows to straighten your arms overhead.</li>
              <li>Squeeze your triceps at the top of the movement.</li>
              <li>Slowly lower the rope back behind your head with control, feeling a stretch in your triceps.</li>
              <li>Keep your core engaged and avoid arching your back throughout the movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Overhead Extension, EZ Bar Overhead Extension</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RopeOverheadExtensionPage;
