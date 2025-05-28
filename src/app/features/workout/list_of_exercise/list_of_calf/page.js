'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css';

const calfExercises = [
  {
    title: 'Machine Calf Raises',
    embedUrl: 'https://www.youtube.com/embed/N3awlEyTY98?si=yDUaHxMYzIVNc_uE',
    path: '/features/workout/list_of_exercise/list_of_calf/machine_calf_raises',
  },
  {
    title: 'Leg press Calf Raises',
    embedUrl: 'https://www.youtube.com/embed/KxEYX_cuesM?si=-Ti47dfXIGp_ghqp',
    path: '/features/workout/list_of_exercise/list_of_calf/leg_press_calf_raises',
  },
  {
    title: 'Smith Machine Calf Raises',
    embedUrl: 'https://www.youtube.com/embed/hh5516HCu4k?si=qweoKwfdk9awBseb',
    path: '/features/workout/list_of_exercise/list_of_calf/smith_machine_calf_raises',
  },
  {
    title: 'Stair Calf Raises',
    embedUrl: 'https://www.youtube.com/embed/__qfDhdByMY?si=HjV-ixkbqReeUcjD',
    path: '/features/workout/list_of_exercise/list_of_calf/stair_calf_raises',
  },

];

const CalfExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Calf Exercises</h1>
        <div className={styles.grid}>
          {calfExercises.map((exercise, index) => (
            exercise.path ? (
              <Link href={exercise.path} key={index} className={styles.card}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={exercise.embedUrl}
                    title={exercise.title}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
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

export default CalfExerciseList;
