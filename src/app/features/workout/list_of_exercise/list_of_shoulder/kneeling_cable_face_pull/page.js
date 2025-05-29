'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const KneelingCableFacePullPage = () => {
  const exercise = {
    id: 'kneeling_cable_face_pull',
    title: 'Kneeling Cable Face Pull',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/kneeling_cable_face_pull',
    embedUrl: 'https://www.youtube.com/embed/8CGMuud1ANw?si=APEXE4rkqfG61VZo',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/8CGMuud1ANw?si=APEXE4rkqfG61VZo"
            title="Kneeling Cable Face Pull"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Kneeling Cable Face Pull</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Kneeling Cable Face Pull is an excellent movement for rear delts and upper back, promoting shoulder health and posture.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Posterior Deltoids, Upper Back, Rotator Cuff</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 12-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Attach a rope to a high pulley and kneel facing the machine.</li>
              <li>Grip the rope with both hands and pull it towards your face, flaring your elbows out.</li>
              <li>Squeeze your shoulder blades together at the end of the movement.</li>
              <li>Return to the start position with control and repeat.</li>
            </ul>
            <p><strong>Alternative:</strong> Standing Cable Face Pull or Band Face Pull</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KneelingCableFacePullPage; 