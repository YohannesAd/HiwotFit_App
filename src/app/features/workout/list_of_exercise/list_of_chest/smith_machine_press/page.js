'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SmithMachinePressPage = () => {
  const exercise = {
    id: 'smith_machine_press',
    title: 'Smith Machine Press',
    category: 'chest',
    path: '/features/workout/list_of_exercise/list_of_chest/smith_machine_press',
    embedUrl: 'https://www.youtube.com/embed/8urE8Z8AMQ4?si=Dqgx7AXWW8II2fez',
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
            The Smith machine press stabilizes the bar path, making it easier to control heavier loads and isolate the chest muscles more safely than free weights.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Middle Chest</p>
            <p><strong>Equipment:</strong> Smith Machine</p>
            <p><strong>Difficulty:</strong> Intermediate</p>
            <p><strong>Type:</strong> Compound</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmithMachinePressPage;
