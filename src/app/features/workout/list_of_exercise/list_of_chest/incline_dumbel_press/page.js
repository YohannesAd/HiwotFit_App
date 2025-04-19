'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/incline_dumbel_press.module.css';

const InclineDumbbellPressPage = () => {
    const router = useRouter()
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
  

      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/5CECBjd7HLQ?si=f6ZK5K0V8w-Z8TCH"
            title="Incline Dumbbell Press"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.title}>Incline Dumbbell Press</h2>
          <p className={styles.description}>
            The incline dumbbell press primarily targets the upper chest and helps build
            strength and muscle mass in the upper pectorals.
          </p>

          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Upper Chest</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit on an incline bench set at 30-45° with dumbbells on your knees.</li>
              <li>Kick the weights up as you lie back, positioning them over your chest.</li>
              <li>Lower the dumbbells slowly to chest level, then press them back up.</li>
              <li>Keep your back slightly arched and feet planted.</li>
            </ul>
            <p><strong>Alternative:</strong> Incline barbell bench press</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InclineDumbbellPressPage;
