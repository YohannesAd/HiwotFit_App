'use client';
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FavoriteButton from '@/app/components/FavoriteButton';
import styles from '@/app/styles/Each_exercise.module.css';

const LegPressCalfRaisesPage = () => {
  // Exercise data
  const exercise = {
    id: 'leg_press_calf_raises',
    title: 'Leg Press Calf Raises',
    category: 'calf',
    path: '/features/workout/list_of_exercise/list_of_calf/leg_press_calf_raises',
    embedUrl: 'https://www.youtube.com/embed/KxEYX_cuesM?si=-Ti47dfXIGp_ghqp',
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.videoSection}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/KxEYX_cuesM?si=-Ti47dfXIGp_ghqp"
            title="Leg Press Calf Raises"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Leg Press Calf Raises</h2>
            <FavoriteButton exercise={exercise} />
          </div>
          <p className={styles.description}>
            Leg press calf raises are performed on a leg press machine and provide an excellent way to target the calf muscles with heavy resistance. This variation allows for a different angle of resistance compared to standing calf raises.
          </p>
          <div className={styles.details}>
            <p><strong>Muscle Focus:</strong> Gastrocnemius, Soleus</p>
            <p><strong>Recommended Sets & Reps:</strong> 3-4 Sets of 15-25 Reps</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Sit in the leg press machine with your back against the pad.</li>
              <li>Place only the balls of your feet on the bottom portion of the footplate.</li>
              <li>Keep your heels hanging off the edge of the platform.</li>
              <li>Release the safety handles and extend your legs to a comfortable position.</li>
              <li>Point your toes and push the weight away by extending through your calves.</li>
              <li>Pause briefly at the peak contraction.</li>
              <li>Slowly return to the starting position, allowing your heels to drop below the platform.</li>
              <li>Maintain control throughout the entire range of motion.</li>
            </ul>
            <p><strong>Alternative:</strong> Machine Calf Raises, Standing Calf Raises, Seated Calf Raises</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegPressCalfRaisesPage;
