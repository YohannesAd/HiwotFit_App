'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const BarbellWalkingLungesPage = () => {
  // Exercise data
  const exercise = {
    id: 'barbell_walking_lunges',
    title: 'Barbell Walking Lunges',
    category: 'glutes',
    path: '/features/workout/list_of_exercise/list_of_glutes/barbell_walking_lunges',
    embedUrl: 'https://www.youtube.com/embed/_meXEWq5MOQ?si=h7z5SP8LIdYChQcy',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/_meXEWq5MOQ?si=h7z5SP8LIdYChQcy"
            title="Barbell Walking Lunges"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Barbell Walking Lunges</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Barbell walking lunges are a dynamic compound exercise that targets the glutes, quadriceps, and hamstrings while also challenging your balance and coordination. This exercise is excellent for building functional lower body strength.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gluteus Maximus, Quadriceps, Hamstrings, Calves</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 10-16 Steps (each leg)</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Position a barbell across your upper traps, similar to a back squat.</li>
              <li>Stand upright with feet hip-width apart and core engaged.</li>
              <li>Take a large step forward with one leg, lowering your hips.</li>
              <li>Lower until both knees are bent at approximately 90 degrees.</li>
              <li>Your front knee should be directly above your ankle, not pushed out past your toes.</li>
              <li>Push through your front heel to bring your back leg forward into the next lunge.</li>
              <li>Continue alternating legs as you walk forward.</li>
              <li>Keep your torso upright and core engaged throughout the movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Dumbbell Walking Lunges, Stationary Lunges, Reverse Lunges</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BarbellWalkingLungesPage;
