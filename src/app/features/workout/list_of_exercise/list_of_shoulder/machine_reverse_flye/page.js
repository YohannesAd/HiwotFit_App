'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineReverseFlye = () => {
  // Exercise data
  const exercise = {
    id: 'machine_reverse_flye',
    title: 'Machine Reverse Flye',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/machine_reverse_flye',
    embedUrl: 'https://www.youtube.com/embed/5YK4bgzXDp0?si=IzhdiC6LqaDO4nsv',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/5YK4bgzXDp0?si=IzhdiC6LqaDO4nsv"
            title="Machine Reverse Flye"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Reverse Flye</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The machine reverse flye primarily targets the posterior (rear) deltoids and also engages the middle and lower trapezius. This exercise is excellent for improving shoulder balance and posture.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Posterior Deltoids, Middle Trapezius, Rhomboids</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 12-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Adjust the seat height so that the handles align with your shoulders.</li>
              <li>Sit facing the machine with your chest against the pad.</li>
              <li>Grasp the handles with your arms extended in front of you.</li>
              <li>Pull the handles back and out to the sides, squeezing your shoulder blades together.</li>
              <li>Hold the contracted position briefly, focusing on the rear deltoids.</li>
              <li>Return to the starting position with control.</li>
              <li>Maintain proper posture throughout the movement, avoiding rounding your back.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Reverse Flye, Face Pull</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineReverseFlye;
