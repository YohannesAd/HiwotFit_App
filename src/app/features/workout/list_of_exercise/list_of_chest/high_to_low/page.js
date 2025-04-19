'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/High_to_low.module.css';

const HighToLowPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.pageContent}>
       
        <div className={styles.contentBox}>
          {/* Left: Embedded YouTube video */}
          <div className={styles.videoBox}>
            <iframe
              src="https://www.youtube.com/embed/Cj6P91eFXkM?si=wUQ_uS_9ykffYuav"
              title="High to Low Cable Flye"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {/* Right: Exercise info */}
          <div className={styles.infoBox}>
            <h2>High to Low Cable Flye</h2>
            <p><strong>Target Muscle:</strong> Lower Chest</p>
            <p><strong>Recommended:</strong> 3–4 sets of 10–15 reps</p>

            <h4>Instructions:</h4> 
            <ul>
              <li>Stand in the center of a cable crossover machine with handles attached high.</li>
              <li>Step forward slightly and bring the handles downward in a hugging motion.</li>
              <li>Keep a slight bend in your elbows and contract your chest at the bottom.</li>
              <li>Slowly return to the starting position with control.</li>
            </ul>

            <h4>Alternatives:</h4>
            <p>You can use resistance bands anchored above shoulder height as an alternative.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HighToLowPage;
