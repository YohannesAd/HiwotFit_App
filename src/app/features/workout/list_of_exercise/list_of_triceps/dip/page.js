'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const DipPage = () => {
  // Exercise data
  const exercise = {
    id: 'dip',
    title: 'Dip',
    category: 'triceps',
    path: '/features/workout/list_of_exercise/list_of_triceps/dip',
    embedUrl: 'https://www.youtube.com/embed/4LA1kF7yCGo?si=bKjYDMieroizHLX',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/4LA1kF7yCGo?si=bKjYDMieroizHLX"
            title="Dip"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Dip</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The dip is a compound bodyweight exercise that primarily targets the triceps while also engaging the chest and shoulders. It&apos;s one of the most effective exercises for building upper body pushing strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Triceps, Chest, Shoulders</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Position yourself on parallel bars with your arms fully extended and supporting your body weight.</li>
              <li>Keep your elbows tucked in close to your body for more triceps emphasis (wider elbows will target the chest more).</li>
              <li>Lower your body by bending at the elbows until you feel a stretch in your chest and shoulders.</li>
              <li>Push yourself back up to the starting position by extending your elbows.</li>
              <li>Keep your shoulders down and away from your ears throughout the movement.</li>
              <li>Maintain an upright torso or lean slightly forward for more triceps focus.</li>
              <li>For beginners, use an assisted dip machine or band assistance until you build enough strength.</li>
            </ul>
            <p><strong>Alternative:</strong> Bench Dips, Close-Grip Push-Up</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DipPage;
