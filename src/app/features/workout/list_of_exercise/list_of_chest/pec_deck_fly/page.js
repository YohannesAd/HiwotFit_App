'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const PecDeckFlyPage = () => {
  const exercise = {
    id: 'pec_deck_fly',
    title: 'Pec Deck Fly',
    category: 'chest',
    path: '/features/workout/list_of_exercise/list_of_chest/pec_deck_fly',
    embedUrl: 'https://www.youtube.com/embed/O-OBCfyh9Fw?si=vBi21qPGJR7qURdR',
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
            The pec deck fly is a machine-based chest isolation movement, ideal for beginners and advanced athletes alike to develop the pectoral muscles with controlled form.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Pectorals</p>
            <p><strong>Equipment:</strong> Pec Deck Machine</p>
            <p><strong>Difficulty:</strong> Beginner</p>
            <p><strong>Type:</strong> Isolation</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PecDeckFlyPage;
