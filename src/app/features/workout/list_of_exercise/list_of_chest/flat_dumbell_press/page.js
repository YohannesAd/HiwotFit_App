'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const FlatDumbbellPressPage = () => {
  // Exercise data
  const exercise = {
    id: 'flat_dumbbell_press',
    title: 'Flat Dumbbell Press',
    category: 'chest',
    path: '/features/workout/list_of_exercise/list_of_chest/flat_dumbell_press',
    embedUrl: 'https://www.youtube.com/embed/YQ2s_Y7g5Qk?si=NfpO_c2xJrbjv6d4',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/YQ2s_Y7g5Qk?si=NfpO_c2xJrbjv6d4"
            title="Flat Dumbbell Press"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Flat Dumbbell Press</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The flat dumbbell press is a fundamental chest exercise that targets the pectoral
            muscles evenly. It also activates the shoulders and triceps to a secondary degree.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Middle Chest</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Lie flat on a bench with a dumbbell in each hand.</li>
              <li>Press the weights upward until your arms are fully extended.</li>
              <li>Lower the weights slowly with control.</li>
              <li>Keep your feet flat on the floor and maintain a slight arch in your lower back.</li>
              <li>Focus on squeezing your chest muscles throughout the movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Barbell Bench Press, Machine Chest Press</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlatDumbbellPressPage;
