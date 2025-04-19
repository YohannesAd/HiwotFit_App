'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Each_exercise.module.css';

const LatPulldownPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/EUIri47Epcg?si=ORG93KIQi_cZ19wL"
            title="Normal Grip Lat Pulldown"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.title}>Normal Grip Lat Pulldown</h2>
          <p className={styles.description}>
            The lat pulldown is a staple for building a wide back. It targets the latissimus dorsi and helps improve pulling strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats</p>
            <p><strong>Recommended Sets & Reps:</strong> 4 Sets of 10-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit down on the machine and grip the bar slightly wider than shoulder-width.</li>
              <li>Pull the bar down to your upper chest while squeezing your shoulder blades together.</li>
              <li>Pause, then slowly return the bar to the top.</li>
              <li>Avoid using momentum; keep the motion controlled.</li>
            </ul>
            <p><strong>Alternative:</strong> Pull-Up or Resistance Band Pulldown</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LatPulldownPage;
