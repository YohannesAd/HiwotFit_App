'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/flat_dumbel_press.module.css'

import { useRouter } from 'next/navigation';

const FlatDumbbellPressPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.pageContent}>
        

        <div className={styles.exerciseContainer}>
          {/* Video on the left */}
          <div className={styles.video}>
            <iframe
              src="https://www.youtube.com/embed/YQ2s_Y7g5Qk?si=NfpO_c2xJrbjv6d4"
              title="Flat Dumbbell Press"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div> 

          {/* Description on the right */}
          <div className={styles.description}>
            <h2>Flat Dumbbell Press</h2>
            <p>
              The flat dumbbell press is a fundamental chest exercise that targets the pectoral
              muscles evenly. It also activates the shoulders and triceps to a secondary degree.
            </p>
            <p><strong>Sets/Reps:</strong> 3-4 sets of 8-12 reps</p>
            <p><strong>Instructions:</strong> Lie flat on a bench with a dumbbell in each hand. Press the weights upward until your arms are fully extended. Lower slowly and repeat.</p>
            <p><strong>Alternative:</strong> Use a barbell instead of dumbbells. This is a classic for building overall chest mass.</p>
            <p><strong>Focus:</strong> Middle chest</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlatDumbbellPressPage;
