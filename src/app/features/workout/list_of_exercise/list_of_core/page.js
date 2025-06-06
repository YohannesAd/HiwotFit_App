'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css';

const coreExercises = [
  {
    title: 'Hanging Knee Raises',
    embedUrl: 'https://www.youtube.com/embed/RD_A-Z15ER4?si=yDqpOeTuCzDUBlhM',
    path: '/features/workout/list_of_exercise/list_of_core/hanging_knee_raises',
  },
  {
    title: 'V-up',
    embedUrl: 'https://www.youtube.com/embed/BIOM5eSsJ_8?si=CYQy124uqien-K83',
    path: '/features/workout/list_of_exercise/list_of_core/v_up',
  },
  {
    title: 'Rope Crunches',
    embedUrl: 'https://www.youtube.com/embed/6GMKPQVERzw?si=q8q6U1qRE2QKG9R1',
    path: '/features/workout/list_of_exercise/list_of_core/rope_crunches',
  },
  {
    title: 'Slant Board Sit-Ups',
    embedUrl: 'https://www.youtube.com/embed/DAnTf16NcT0?si=aMaMIJqFLQPagS4M',
    path: '/features/workout/list_of_exercise/list_of_core/slant_board_sit_ups',
  },
  {
    title: 'Machine Crunches',
    embedUrl: 'https://www.youtube.com/embed/-OUSBPnHvsQ?si=0En28T6ZekRk3a7k',
    path: '/features/workout/list_of_exercise/list_of_core/machine_crunches',
  },
  {
    title: 'Hanging Straight Leg Raises',
    embedUrl: 'https://www.youtube.com/embed/7FwGZ8qY5OU?si=sncwvP1uUS3N7U5X',
    path: '/features/workout/list_of_exercise/list_of_core/hanging_straight_leg_raises',
  },
];

const CoreExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Core Exercises</h1>
        <div className={styles.grid}>
          {coreExercises.map((exercise, index) => (
            exercise.path ? (
              <Link href={exercise.path} key={index} className={styles.card}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={exercise.embedUrl}
                    title={exercise.title}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
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
                    style={{ border: 0 }}
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

export default CoreExerciseList;
