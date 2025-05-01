'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const LateralRaisePage = () => {
  // Exercise data
  const exercise = {
    id: 'lateral_raise',
    title: 'Lateral Raise',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/lateral_raise',
    embedUrl: 'https://www.youtube.com/embed/OuG1smZTsQQ?si=EaAdUx12p4Hj99hO',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/OuG1smZTsQQ?si=EaAdUx12p4Hj99hO"
            title="Lateral Raise"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Lateral Raise</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The lateral raise is an isolation exercise that targets the lateral (side) deltoids. It's excellent for building shoulder width and creating that coveted V-taper physique.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Lateral Deltoids (Side Shoulders)</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-15 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand with feet shoulder-width apart, holding a dumbbell in each hand at your sides.</li>
              <li>Keep a slight bend in your elbows throughout the movement.</li>
              <li>Raise the dumbbells out to the sides until they reach shoulder level.</li>
              <li>Pause briefly at the top, focusing on contracting the side deltoids.</li>
              <li>Lower the weights back to the starting position with control.</li>
              <li>Avoid using momentum or swinging the weights up.</li>
            </ul>
            <p><strong>Alternative:</strong> Cable Lateral Raise, Machine Lateral Raise</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LateralRaisePage;
