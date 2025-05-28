'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineHipThrustsPage = () => {
  // Exercise data
  const exercise = {
    id: 'machine_hip_thrusts',
    title: 'Machine Hip Thrusts',
    category: 'glutes',
    path: '/features/workout/list_of_exercise/list_of_glutes/machine_hip_thrusts',
    embedUrl: 'https://www.youtube.com/embed/ZSPmIyX9RZs?si=1zAOYmZiGs_N3Xli',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/ZSPmIyX9RZs?si=1zAOYmZiGs_N3Xli"
            title="Machine Hip Thrusts"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Hip Thrusts</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Machine hip thrusts provide a controlled and stable way to perform hip thrusts with consistent resistance. The machine setup eliminates the need for setup with barbells and benches, making it more accessible and comfortable.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gluteus Maximus, Hamstrings, Core</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-18 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Adjust the machine to fit your body size and sit with your back against the pad.</li>
              <li>Position your feet flat on the platform, shoulder-width apart.</li>
              <li>Place the resistance pad across your hips and secure it comfortably.</li>
              <li>Keep your knees bent at approximately 90 degrees throughout the movement.</li>
              <li>Drive through your heels and squeeze your glutes to push your hips forward.</li>
              <li>Extend your hips until your body forms a straight line from knees to shoulders.</li>
              <li>Pause briefly at the top and squeeze your glutes hard.</li>
              <li>Lower your hips slowly and with control back to the starting position.</li>
            </ul>
            <p><strong>Alternative:</strong> Barbell Hip Thrusts, Glute Bridges, Single Leg Hip Thrusts</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineHipThrustsPage;
