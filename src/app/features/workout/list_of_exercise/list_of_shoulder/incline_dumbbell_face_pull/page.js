'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const InclineDumbbellFacePullPage = () => {
  const exercise = {
    id: 'incline_dumbbell_face_pull',
    title: 'Incline Dumbbell Face Pull',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/incline_dumbbell_face_pull',
    embedUrl: 'https://www.youtube.com/embed/90cE3rCLtmo?si=Hv1_qUCq9jjT8tcs',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/90cE3rCLtmo?si=Hv1_qUCq9jjT8tcs"
            title="Incline Dumbbell Face Pull"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Incline Dumbbell Face Pull</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The Incline Dumbbell Face Pull is a great exercise for targeting the rear delts and improving shoulder health.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Posterior Deltoids, Upper Back, Rotator Cuff</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Set an incline bench to about 30-45 degrees and lie face down with a dumbbell in each hand.</li>
              <li>With arms hanging down, pull the dumbbells up and out to the sides, leading with your elbows.</li>
              <li>Squeeze your shoulder blades together at the top.</li>
              <li>Lower the weights back down in a controlled manner and repeat.</li>
            </ul>
            <p><strong>Alternative:</strong> Face Pull with Cable or Band</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InclineDumbbellFacePullPage; 