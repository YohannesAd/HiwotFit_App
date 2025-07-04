'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineCrunchesPage = () => {
  // Exercise data
  const exercise = {
    id: 'machine_crunches',
    title: 'Machine Crunches',
    category: 'core',
    path: '/features/workout/list_of_exercise/list_of_core/machine_crunches',
    embedUrl: 'https://www.youtube.com/embed/-OUSBPnHvsQ?si=0En28T6ZekRk3a7k',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/-OUSBPnHvsQ?si=0En28T6ZekRk3a7k"
            title="Machine Crunches"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Crunches</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Machine crunches are an excellent isolation exercise for targeting the rectus abdominis (the &quot;six-pack&quot; muscles). The machine provides consistent resistance throughout the movement and helps maintain proper form.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Rectus Abdominis, Obliques</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 12-20 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Adjust the seat height so your upper back is against the pad.</li>
              <li>Grasp the handles or place your hands across your chest.</li>
              <li>Keep your feet flat on the floor or footrests.</li>
              <li>Contract your abs and crunch forward, bringing your chest toward your knees.</li>
              <li>Pause briefly at the peak contraction.</li>
              <li>Slowly return to the starting position with control.</li>
              <li>Keep the movement smooth and controlled throughout.</li>
            </ul>
            <p><strong>Alternative:</strong> Cable Crunches, Weighted Crunches, Decline Crunches</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineCrunchesPage;
