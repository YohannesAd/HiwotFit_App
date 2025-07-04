'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SmithMachineCalfRaisesPage = () => {
  // Exercise data
  const exercise = {
    id: 'smith_machine_calf_raises',
    title: 'Smith Machine Calf Raises',
    category: 'calf',
    path: '/features/workout/list_of_exercise/list_of_calf/smith_machine_calf_raises',
    embedUrl: 'https://www.youtube.com/embed/hh5516HCu4k?si=qweoKwfdk9awBseb',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/hh5516HCu4k?si=qweoKwfdk9awBseb"
            title="Smith Machine Calf Raises"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Smith Machine Calf Raises</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Smith machine calf raises provide the stability of a guided barbell path while allowing you to load heavy weight for calf development. The Smith machine&apos;s safety features make this an excellent option for progressive overload.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gastrocnemius, Soleus</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-18 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Set up a platform or step under the Smith machine bar.</li>
              <li>Position the bar across your upper traps, similar to a squat position.</li>
              <li>Step onto the platform with the balls of your feet, heels hanging off.</li>
              <li>Unlock the bar and maintain an upright posture throughout the movement.</li>
              <li>Lower your heels as far as possible to stretch your calves.</li>
              <li>Push through the balls of your feet to raise your heels as high as possible.</li>
              <li>Pause at the top and squeeze your calf muscles.</li>
              <li>Lower slowly and with control back to the starting position.</li>
            </ul>
            <p><strong>Alternative:</strong> Barbell Calf Raises, Machine Calf Raises, Dumbbell Calf Raises</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmithMachineCalfRaisesPage;
