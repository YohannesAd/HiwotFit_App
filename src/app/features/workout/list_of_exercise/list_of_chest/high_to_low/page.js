'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Each_exercise.module.css';

const HighToLowPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/Cj6P91eFXkM?si=wUQ_uS_9ykffYuav"
            title="High to Low Cable Flye"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.title}>High to Low Cable Flye</h2>
          <p className={styles.description}>
            The high to low cable flye targets the lower chest muscles. This exercise helps develop definition in the lower portion of the pectorals and improves overall chest development.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lower Chest</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand in the center of a cable crossover machine with handles attached high.</li>
              <li>Step forward slightly and bring the handles downward in a hugging motion.</li>
              <li>Keep a slight bend in your elbows and contract your chest at the bottom.</li>
              <li>Slowly return to the starting position with control.</li>
              <li>Focus on feeling the stretch in your chest at the top of the movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Resistance bands anchored above shoulder height, Decline dumbbell flyes</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HighToLowPage;
