'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const DumbbellStiffLegDeadliftPage = () => {
  // Exercise data
  const exercise = {
    id: 'dumbbell_stiff_leg_deadlift',
    title: 'Dumbbell Stiff Legged Deadlift',
    category: 'leg',
    path: '/features/workout/list_of_exercise/list_of_leg/dumbbell_stiff_leg_deadlift',
    embedUrl: 'https://www.youtube.com/embed/cYKYGwcg0U8?si=yXRUNtrMdsX5yd8l',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/cYKYGwcg0U8?si=yXRUNtrMdsX5yd8l"
            title="Dumbbell Stiff Legged Deadlift"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Dumbbell Stiff Legged Deadlift</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            The dumbbell stiff legged deadlift primarily targets the hamstrings and lower back. It's an excellent exercise for developing posterior chain strength and improving hip mobility.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Hamstrings, Lower Back, Glutes</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-12 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand with feet hip-width apart, holding dumbbells in front of your thighs.</li>
              <li>Keep a slight bend in your knees throughout the movement.</li>
              <li>Hinge at the hips while keeping your back straight, and lower the dumbbells toward the floor.</li>
              <li>Lower until you feel a stretch in your hamstrings, typically when the dumbbells reach mid-shin level.</li>
              <li>Drive through your heels and squeeze your glutes to return to the starting position.</li>
              <li>Maintain a neutral spine throughout the entire movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Romanian Deadlift, Single-Leg Deadlift</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DumbbellStiffLegDeadliftPage;