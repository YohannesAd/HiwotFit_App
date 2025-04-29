'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css'; // shared CSS

const tricepsExercises = [
  {
    title: 'Cable Triceps Push Down',
    embedUrl: 'https://www.youtube.com/embed/6Fzep104f0s?si=aW_GJjkKZGTLvKWu',
    path: '/features/workout/list_of_exercise/list_of_triceps/cable_triceps_pushdown',
  },
  {
    title: 'Rope Overhead Triceps Extension',
    embedUrl: 'https://www.youtube.com/embed/kqidUIf1eJE?si=5rO9-2VthUUCpJ1Q',
    path: '/features/workout/list_of_exercise/list_of_triceps/rope_overhead_extension',
  },
  {
    title: 'Dip',
    embedUrl: 'https://www.youtube.com/embed/4LA1kF7yCGo?si=bKjYDMieroizHLX',
    path: '/features/workout/list_of_exercise/list_of_triceps/dip',
  },
  {
    title: 'Machine Triceps Push Down',
    embedUrl: 'https://www.youtube.com/embed/OChuGyCSC7U?si=5mu5U7uOb1uNLkyM',
    path: '/features/workout/list_of_exercise/list_of_triceps/machine_triceps_pushdown',
  },
];

const TricepsExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Triceps Exercises</h1>
        <div className={styles.grid}>
          {tricepsExercises.map((exercise, index) => (
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

export default TricepsExerciseList;
