'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SeatedDumbbellPressPage = () => {
  // Exercise data
  const exercise = {
    id: 'seated_dumbbell_press',
    title: 'Seated Dumbbell Shoulder Press',
    category: 'shoulder',
    path: '/features/workout/list_of_exercise/list_of_shoulder/seated_dumbbell_press',
    embedUrl: 'https://www.youtube.com/embed/HzIiNhHhhtA?si=ZM1BCq61I1_FW43v',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/HzIiNhHhhtA?si=ZM1BCq61I1_FW43v"
            title="Seated Dumbbell Shoulder Press"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Seated Dumbbell Shoulder Press</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The seated dumbbell shoulder press is a compound exercise that targets all three heads of the deltoids, with emphasis on the anterior (front) deltoids. It also engages the triceps and upper chest as secondary muscles.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Anterior Deltoids, Lateral Deltoids, Posterior Deltoids, Triceps</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 8-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit on a bench with back support, holding a dumbbell in each hand at shoulder height.</li>
              <li>Position the dumbbells with palms facing forward or in a neutral grip (palms facing each other).</li>
              <li>Press the dumbbells upward until your arms are fully extended, but not locked out.</li>
              <li>Pause briefly at the top, then lower the weights with control back to shoulder level.</li>
              <li>Keep your core engaged and maintain a neutral spine throughout the movement.</li>
              <li>Avoid using momentum or arching your back to lift the weights.</li>
            </ul>
            <p><strong>Alternative:</strong> Standing Dumbbell Press, Arnold Press</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeatedDumbbellPressPage;
