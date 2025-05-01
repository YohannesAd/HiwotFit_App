'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css'; // shared for all lists

const bicepsExercises = [
  {
    title: 'Barbell Curl (Narrow Grip)',
    embedUrl: 'https://www.youtube.com/embed/pUS6HBQjRmc?si=_1r-ueq5y5PD88Ls',
    path: '/features/workout/list_of_exercise/list_of_biceps/barbell_curl_narrow',
  },
  {
    title: 'Incline Dumbbell Curl',
    embedUrl: 'https://www.youtube.com/embed/aTYlqC_JacQ?si=IW_zQGPPuWmm4vGk',
    path: '/features/workout/list_of_exercise/list_of_biceps/incline_dumbbell_curl',
  },
  {
    title: 'Dumbbell Spider Curl',
    embedUrl: 'https://www.youtube.com/embed/ke2shAeQ0O8?si=Q1DjJymOYUU13Er9',
    path: '/features/workout/list_of_exercise/list_of_biceps/Dumbbell_Spider_Curl',
  },
  {
    title: 'Hammer Curl',
    embedUrl: 'https://www.youtube.com/embed/XOEL4MgekYE?si=bIOvD43fXMF9MIbK',
    path: '/features/workout/list_of_exercise/list_of_biceps/Hammer_Curl',
  },
];

const BicepsExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Biceps Exercises</h1>
        <div className={styles.grid}>
          {bicepsExercises.map((exercise, index) => (
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

export default BicepsExerciseList;
