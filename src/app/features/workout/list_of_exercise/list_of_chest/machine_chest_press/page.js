'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineChestPressPage = () => {
  // Exercise data
  const exercise = {
    id: 'machine_chest_press',
    title: 'Machine Chest Press',
    category: 'chest',
    path: '/features/workout/list_of_exercise/list_of_chest/machine_chest_press',
    embedUrl: 'https://www.youtube.com/embed/NwzUje3z0qY?si=NhOvYVf_AIp9ozup',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/NwzUje3z0qY?si=NhOvYVf_AIp9ozup"
            title="Machine Chest Press"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Chest Press</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The machine chest press is a great beginner- and intermediate-friendly exercise that targets the pectoral muscles, especially the middle chest. It provides guided motion to help you maintain proper form while building strength and muscle size.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Middle Chest (Pectoralis Major)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Adjust the seat so that the handles are level with your chest.</li>
              <li>Grasp the handles and press forward until your arms are extended.</li>
              <li>Pause briefly at the top, then return slowly to the start position.</li>
              <li>Keep your back flat and feet planted on the ground.</li>
              <li>Focus on controlling the weight throughout the entire movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Seated Chest Press with Dumbbells, Flat Barbell Bench Press</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineChestPressPage;
