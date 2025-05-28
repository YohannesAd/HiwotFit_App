'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const DeadLiftPage = () => {
  // Exercise data
  const exercise = {
    id: 'dead_lift',
    title: 'Dead Lift',
    category: 'glutes',
    path: '/features/workout/list_of_exercise/list_of_glutes/dead_lift',
    embedUrl: 'https://www.youtube.com/embed/AweC3UaM14o?si=ZcEFCKWB_IMteJYG',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/AweC3UaM14o?si=ZcEFCKWB_IMteJYG"
            title="Dead Lift"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Dead Lift</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The deadlift is one of the most fundamental compound exercises in strength training. It targets multiple muscle groups simultaneously, with primary emphasis on the posterior chain including glutes, hamstrings, and erector spinae.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gluteus Maximus, Hamstrings, Erector Spinae, Traps, Lats</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-5 Sets of 3-8 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand with feet hip-width apart, barbell over mid-foot.</li>
              <li>Bend at the hips and knees to grip the bar with hands just outside your legs.</li>
              <li>Keep your chest up, shoulders back, and maintain a neutral spine.</li>
              <li>Engage your lats and core before lifting.</li>
              <li>Drive through your heels and extend your hips and knees simultaneously.</li>
              <li>Keep the bar close to your body throughout the movement.</li>
              <li>Stand tall at the top, then reverse the movement to lower the weight.</li>
              <li>Maintain proper form throughout - never round your back.</li>
            </ul>
            <p><strong>Alternative:</strong> Romanian Deadlift, Trap Bar Deadlift, Sumo Deadlift</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeadLiftPage;
