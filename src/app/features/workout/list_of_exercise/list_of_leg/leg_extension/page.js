'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Each_exercise.module.css';

const LegExtensionPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/m0FOpMEgero?si=Ab6RLx9zeGNlipwE"
            title="Leg Extension"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.title}>Leg Extension</h2>
          <p className={styles.description}>
            The leg extension is an isolation exercise that targets the quadriceps. It's particularly effective for strengthening the muscles around the knee joint and developing definition in the front of the thigh.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Quadriceps</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 12-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit on the leg extension machine with your back against the pad and knees bent at 90 degrees.</li>
              <li>Hook your feet under the padded bar, adjusting it to sit on top of your lower shins.</li>
              <li>Grasp the side handles for stability.</li>
              <li>Extend your legs forward until they're almost straight, but not locked out.</li>
              <li>Squeeze your quadriceps at the top of the movement.</li>
              <li>Slowly lower the weight back to the starting position with control.</li>
              <li>Keep your upper body still throughout the exercise.</li>
            </ul>
            <p><strong>Alternative:</strong> Sissy Squat, Wall Sit</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegExtensionPage;