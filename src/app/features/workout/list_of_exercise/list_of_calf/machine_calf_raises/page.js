'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineCalfRaisesPage = () => {
  // Exercise data
  const exercise = {
    id: 'machine_calf_raises',
    title: 'Machine Calf Raises',
    category: 'calf',
    path: '/features/workout/list_of_exercise/list_of_calf/machine_calf_raises',
    embedUrl: 'https://www.youtube.com/embed/N3awlEyTY98?si=yDUaHxMYzIVNc_uE',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/N3awlEyTY98?si=yDUaHxMYzIVNc_uE"
            title="Machine Calf Raises"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Calf Raises</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Machine calf raises are an excellent isolation exercise for building calf muscle mass and strength. The machine provides stability and allows you to focus purely on the calf contraction with consistent resistance.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gastrocnemius, Soleus</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 12-20 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Position yourself in the calf raise machine with your shoulders under the pads.</li>
              <li>Place the balls of your feet on the platform with your heels hanging off.</li>
              <li>Keep your legs straight and core engaged throughout the movement.</li>
              <li>Lower your heels as far as possible to get a full stretch in your calves.</li>
              <li>Push through the balls of your feet to raise your heels as high as possible.</li>
              <li>Pause briefly at the top and squeeze your calves.</li>
              <li>Lower slowly and with control back to the starting position.</li>
            </ul>
            <p><strong>Alternative:</strong> Standing Calf Raises, Dumbbell Calf Raises, Bodyweight Calf Raises</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineCalfRaisesPage;
