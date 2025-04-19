'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css';

const chestExercises = [
  {
    title: 'Incline Dumbbell Press',
    embedUrl: 'https://www.youtube.com/embed/5CECBjd7HLQ?si=f6ZK5K0V8w-Z8TCH',
    path: '/features/workout/list_of_exercise/list_of_chest/incline_dumbel_press',
  },
  {
    title: 'High to Low Cable Flye',
    embedUrl: 'https://www.youtube.com/embed/Cj6P91eFXkM?si=wUQ_uS_9ykffYuav',
    path: '/features/workout/list_of_exercise/list_of_chest/high_to_low',
  },
  {
    title: 'Flat Dumbbell Press',
    embedUrl: 'https://www.youtube.com/embed/YQ2s_Y7g5Qk?si=NfpO_c2xJrbjv6d4',
    path: '/features/workout/list_of_exercise/list_of_chest/flat_dumbell_press',
  },
  {
    title: 'Machine Chest Press',
    embedUrl: 'https://www.youtube.com/embed/NwzUje3z0qY?si=NhOvYVf_AIp9ozup',
    path: '/features/workout/list_of_exercise/list_of_chest/machine_chest_press',
  },
];

const ChestExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Chest Exercises</h1>
        <div className={styles.grid}>
          {chestExercises.map((exercise, index) => (
            exercise.path ? (
              <Link href={exercise.path} key={index} className={styles.card}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={exercise.embedUrl}
                    title={exercise.title}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className={styles.clickOverlay}></div>
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

export default ChestExerciseList;

