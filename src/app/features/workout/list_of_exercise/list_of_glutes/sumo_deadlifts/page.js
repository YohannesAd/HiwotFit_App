'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const SumoDeadliftsPage = () => {
  // Exercise data
  const exercise = {
    id: 'sumo_deadlifts',
    title: 'Sumo Deadlifts',
    category: 'glutes',
    path: '/features/workout/list_of_exercise/list_of_glutes/sumo_deadlifts',
    embedUrl: 'https://www.youtube.com/embed/pfSMst14EFk?si=Vy38HmRitc1z69t9',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/pfSMst14EFk?si=Vy38HmRitc1z69t9"
            title="Sumo Deadlifts"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Sumo Deadlifts</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Sumo deadlifts are a variation of the conventional deadlift with a wider stance and different grip position. This variation places greater emphasis on the glutes and inner thighs while reducing stress on the lower back.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gluteus Maximus, Adductors, Hamstrings, Quadriceps, Traps</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-5 Sets of 3-8 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Stand with feet wider than shoulder-width, toes pointed slightly outward.</li>
              <li>Position the barbell over the middle of your feet.</li>
              <li>Squat down and grip the bar with hands inside your legs, arms straight.</li>
              <li>Keep your chest up, shoulders back, and maintain a neutral spine.</li>
              <li>Engage your core and drive through your heels to lift the weight.</li>
              <li>Focus on pushing the floor away rather than pulling the bar up.</li>
              <li>Stand tall at the top, then reverse the movement to lower the weight.</li>
              <li>Keep the bar close to your body throughout the entire movement.</li>
            </ul>
            <p><strong>Alternative:</strong> Conventional Deadlift, Romanian Deadlift, Trap Bar Deadlift</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SumoDeadliftsPage;
