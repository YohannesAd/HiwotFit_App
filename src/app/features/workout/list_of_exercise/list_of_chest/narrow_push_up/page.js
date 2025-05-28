'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const NarrowPushUpPage = () => {
  const exercise = {
    id: 'narrow_push_up',
    title: 'Narrow Push Up',
    category: 'chest',
    path: '/features/workout/list_of_exercise/list_of_chest/narrow_push_up',
    embedUrl: 'https://www.youtube.com/embed/Lz1aFtuNvEQ?si=GVQQxEhm2GRBvOYy',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src={exercise.embedUrl}
            title={exercise.title}
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{exercise.title}</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Narrow push-ups are a bodyweight exercise that primarily targets the triceps and inner chest, providing a great way to build upper body strength without equipment.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Inner Chest, Triceps</p>
            <p><strong>Equipment:</strong> Bodyweight</p>
            <p><strong>Difficulty:</strong> Beginner</p>
            <p><strong>Type:</strong> Compound</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NarrowPushUpPage;
