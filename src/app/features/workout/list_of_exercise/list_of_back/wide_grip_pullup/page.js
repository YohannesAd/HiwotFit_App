'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const WideGripPullUpPage = () => {
  const router = useRouter();

  // Exercise data
  const exercise = {
    id: 'wide_grip_pullup',
    title: 'Wide Grip Pull-Up',
    category: 'back',
    path: '/features/workout/list_of_exercise/list_of_back/wide_grip_pullup',
    embedUrl: 'https://www.youtube.com/embed/GRgWPT9XSQQ?si=acb_MT79N0RZ7XW7',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/GRgWPT9XSQQ?si=acb_MT79N0RZ7XW7"
            title="Wide Grip Pull-Up"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Wide Grip Pull-Up</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The wide grip pull-up is a classic bodyweight exercise for building width in the back and increasing upper body strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lats, Upper Back</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets to failure or 6-10 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Hang from a bar with hands wider than shoulder-width, palms facing away.</li>
              <li>Pull yourself up until your chin clears the bar.</li>
              <li>Lower yourself in a controlled motion and repeat.</li>
              <li>Engage the core and avoid swinging.</li>
            </ul>
            <p><strong>Alternative:</strong> Assisted Pull-Up Machine or Band Pull-Ups</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WideGripPullUpPage;
