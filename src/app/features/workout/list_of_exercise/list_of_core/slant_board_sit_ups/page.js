'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SlantBoardSitUpsPage = () => {
  // Exercise data
  const exercise = {
    id: 'slant_board_sit_ups',
    title: 'Slant Board Sit-Ups',
    category: 'core',
    path: '/features/workout/list_of_exercise/list_of_core/slant_board_sit_ups',
    embedUrl: 'https://www.youtube.com/embed/DAnTf16NcT0?si=aMaMIJqFLQPagS4M',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/DAnTf16NcT0?si=aMaMIJqFLQPagS4M"
            title="Slant Board Sit-Ups"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Slant Board Sit-Ups</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Slant board sit-ups are performed on an inclined bench, increasing the difficulty and range of motion compared to regular sit-ups. This exercise effectively targets the entire abdominal region.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Upper & Lower Abs, Hip Flexors</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 15-25 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Lie on a decline bench with your feet secured at the top.</li>
              <li>Place your hands behind your head or crossed over your chest.</li>
              <li>Engage your core and sit up by flexing your spine.</li>
              <li>Come up until your torso is perpendicular to the floor.</li>
              <li>Slowly lower back down with control, maintaining tension in your abs.</li>
            </ul>
            <p><strong>Alternative:</strong> Regular Sit-ups, Weighted Sit-ups</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SlantBoardSitUpsPage;
