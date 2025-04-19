'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Each_exercise.module.css';

const TBarRowPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/yPis7nlbqdY?si=qw9maoubevLTYDRJ"
            title="T-Bar Row"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.title}>T-Bar Row</h2>
          <p className={styles.description}>
            The T-bar row is a heavy compound movement for back thickness. It targets the middle back and helps improve posture and pulling strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Middle Back, Rhomboids</p>
            <p><strong>Recommended Sets & Reps:</strong> 4 Sets of 8-10 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand over the bar with feet shoulder-width apart and knees slightly bent.</li>
              <li>Grasp the handles and lift the bar by driving through your heels.</li>
              <li>Row the bar towards your chest, keeping elbows tucked in.</li>
              <li>Lower it slowly and repeat.</li>
            </ul>
            <p><strong>Alternative:</strong> Barbell Row</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TBarRowPage;
