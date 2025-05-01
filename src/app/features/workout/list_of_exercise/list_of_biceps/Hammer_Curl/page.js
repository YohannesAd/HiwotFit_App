'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const HammerCurlPage = () => {
  // Exercise data
  const exercise = {
    id: 'hammer_curl',
    title: 'Hammer Curl',
    category: 'biceps',
    path: '/features/workout/list_of_exercise/list_of_biceps/Hammer_Curl',
    embedUrl: 'https://www.youtube.com/embed/XOEL4MgekYE?si=bIOvD43fXMF9MIbK',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/XOEL4MgekYE?si=bIOvD43fXMF9MIbK"
            title="Hammer Curl"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Hammer Curl</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The hammer curl is a biceps exercise that also targets the brachialis and forearms. The neutral grip (palms facing each other) helps develop forearm thickness and grip strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Biceps, Brachialis, Forearms</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand with feet shoulder-width apart, holding a dumbbell in each hand at your sides.</li>
              <li>Keep your palms facing your body (neutral grip) throughout the movement.</li>
              <li>Keeping your upper arms stationary, curl the weights up by flexing at the elbow.</li>
              <li>Squeeze your biceps at the top of the movement, then slowly lower the weights back to the starting position.</li>
              <li>Maintain proper form and avoid using momentum to lift the weights.</li>
            </ul>
            <p><strong>Alternative:</strong> Cross-Body Hammer Curl, Cable Rope Hammer Curl</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HammerCurlPage;