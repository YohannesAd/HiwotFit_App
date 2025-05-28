'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css';

const glutesExercises = [
  {
    title: 'Hip Thrusts',
    embedUrl: 'https://www.youtube.com/embed/EF7jXP17DPE?si=dOGKSWoWlya5IY1V',
    path: null, // Will be added later when individual exercise pages are created
  },
  {
    title: 'Barbell Walking Lunges',
    embedUrl: 'https://www.youtube.com/embed/_meXEWq5MOQ?si=h7z5SP8LIdYChQcy',
    path: null,
  },
  {
    title: 'Dead Lift',
    embedUrl: 'https://www.youtube.com/embed/AweC3UaM14o?si=ZcEFCKWB_IMteJYG',
    path: null,
  },
  {
    title: 'Machine Hip Thrusts',
    embedUrl: 'https://www.youtube.com/embed/ZSPmIyX9RZs?si=1zAOYmZiGs_N3Xli',
    path: null,
  },
  {
    title: 'Single Leg Hip Thrusts',
    embedUrl: 'https://www.youtube.com/embed/lzDgRRuBdqY?si=lLQNWLLF9WT4AeQS',
    path: null,
  },
  {
    title: 'Sumo Deadlifts',
    embedUrl: 'https://www.youtube.com/embed/pfSMst14EFk?si=Vy38HmRitc1z69t9',
    path: null,
  },
];

const GlutesExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Glutes Exercises</h1>
        <div className={styles.grid}>
          {glutesExercises.map((exercise, index) => (
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

export default GlutesExerciseList;
