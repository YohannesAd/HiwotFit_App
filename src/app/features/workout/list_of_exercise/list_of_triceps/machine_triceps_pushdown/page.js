'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const MachineTricepsPushdownPage = () => {
  // Exercise data
  const exercise = {
    id: 'machine_triceps_pushdown',
    title: 'Machine Triceps Push Down',
    category: 'triceps',
    path: '/features/workout/list_of_exercise/list_of_triceps/machine_triceps_pushdown',
    embedUrl: 'https://www.youtube.com/embed/OChuGyCSC7U?si=5mu5U7uOb1uNLkyM',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/OChuGyCSC7U?si=5mu5U7uOb1uNLkyM"
            title="Machine Triceps Push Down"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Machine Triceps Push Down</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The machine triceps pushdown is a guided variation of the cable pushdown that provides stability and consistent resistance throughout the movement. It&apos;s ideal for beginners and those looking to isolate the triceps with proper form.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Triceps</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Adjust the seat height so that your elbows are aligned with the pivot point of the machine.</li>
              <li>Sit facing the machine with your back against the pad and feet flat on the floor.</li>
              <li>Grasp the handles with an overhand grip (palms facing down).</li>
              <li>Keep your upper arms close to your body and perpendicular to the floor.</li>
              <li>Push the handles down by extending your elbows until your arms are fully straightened.</li>
              <li>Squeeze your triceps at the bottom of the movement.</li>
              <li>Slowly return to the starting position with control.</li>
              <li>Maintain proper posture throughout the exercise, avoiding leaning forward or back.</li>
            </ul>
            <p><strong>Alternative:</strong> Cable Triceps Pushdown, Triceps Kickback</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MachineTricepsPushdownPage;
