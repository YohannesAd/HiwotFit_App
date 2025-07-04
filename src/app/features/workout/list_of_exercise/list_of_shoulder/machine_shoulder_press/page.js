'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineShoulderPressPage = () => {
  // Exercise data
  const exercise = {
    id: 'machine_shoulder_press',
    title: 'Machine Shoulder Press',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/machine_shoulder_press',
    embedUrl: 'https://www.youtube.com/embed/WvLMauqrnK8?si=UubLuSEOetdKMlbx',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/WvLMauqrnK8?si=UubLuSEOetdKMlbx"
            title="Machine Shoulder Press"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Shoulder Press</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The machine shoulder press is a compound exercise that primarily targets the anterior (front) deltoids while also engaging the lateral deltoids and triceps. It&apos;s a great option for beginners or those looking for a stable, guided movement.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Anterior Deltoids, Lateral Deltoids, Triceps</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Adjust the seat height so that the handles are at shoulder level.</li>
              <li>Sit with your back against the pad and grasp the handles.</li>
              <li>Press the weight upward until your arms are fully extended, but not locked out.</li>
              <li>Pause briefly at the top of the movement.</li>
              <li>Lower the weight with control back to the starting position.</li>
              <li>Keep your core engaged and avoid arching your back throughout the movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Shoulder Press, Barbell Overhead Press</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineShoulderPressPage;
