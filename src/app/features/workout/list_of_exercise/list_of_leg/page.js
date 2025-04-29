'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css'; // shared CSS

const legExercises = [
  {
    title: 'Dumbbell Stiff Legged Deadlift',
    embedUrl: 'https://www.youtube.com/embed/cYKYGwcg0U8?si=yXRUNtrMdsX5yd8l',
    path: '/features/workout/list_of_exercise/list_of_leg/dumbbell_stiff_leg_deadlift',
  },
  {
    title: 'Lying Leg Curl',
    embedUrl: 'https://www.youtube.com/embed/n5WDXD_mpVY?si=J-92C9UT_A2CNTl8',
    path: '/features/workout/list_of_exercise/list_of_leg/lying_leg_curl',
  },
  {
    title: 'Leg Extension',
    embedUrl: 'https://www.youtube.com/embed/m0FOpMEgero?si=Ab6RLx9zeGNlipwE',
    path: '/features/workout/list_of_exercise/list_of_leg/leg_extension',
  },
  {
    title: 'High Bar Squat',
    embedUrl: 'https://www.youtube.com/embed/i7J5h7BJ07g?si=K-6WnLuR67HxgqQA',
    path: '/features/workout/list_of_exercise/list_of_leg/high_bar_squat',
  },
];

const LegExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Leg Exercises</h1>
        <div className={styles.grid}>
          {legExercises.map((exercise, index) => (
            exercise.path ? (
              <Link href={exercise.path} key={index} className={styles.card}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={exercise.embedUrl}
                    title={exercise.title}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className={styles.clickOverlay}></div> {/* clickable overlay */}
                </div>
                <p className={styles.label}>{exercise.title}</p>
              </Link>
            ) : (
              <div key={index} className={styles.card}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={exercise.embedUrl}
                    title={exercise.title}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className={styles.label}>{exercise.title}</p>
              </div>
            )
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegExerciseList;
