'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css'; // shared CSS

const backExercises = [
  {
    title: 'Normal Grip Lat Pulldown',
    embedUrl: 'https://www.youtube.com/embed/EUIri47Epcg?si=ORG93KIQi_cZ19wL',
    path: '/features/workout/list_of_exercise/list_of_back/normal_grip_lat_pulldown',
  },
  {
    title: 'T-Bar Row',
    embedUrl: 'https://www.youtube.com/embed/yPis7nlbqdY?si=qw9maoubevLTYDRJ',
    path: '/features/workout/list_of_exercise/list_of_back/t_bar_row',
  },
  {
    title: 'Dumbbell Pullover',
    embedUrl: 'https://www.youtube.com/embed/jQjWlIwG4sI?si=0l7Ip5uFvWos8e5o',
    path: '/features/workout/list_of_exercise/list_of_back/dumbbel_pullover',
  },
  {
    title: 'Wide Grip Pull-Up',
    embedUrl: 'https://www.youtube.com/embed/GRgWPT9XSQQ?si=acb_MT79N0RZ7XW7',
    path: '/features/workout/list_of_exercise/list_of_back/wide_grip_pullup',
  },
  {
    title: 'Hammer High Row',
    embedUrl: 'https://www.youtube.com/embed/gg5hwJuv6KI?si=bR5u69e7miWfNbwy',
    path: '/features/workout/list_of_exercise/list_of_back/hammer_high_row',
  },
  {
    title: 'Incline Dumbbell Row',
    embedUrl: 'https://www.youtube.com/embed/tZUYS7X50so?si=4nYlsTJBCU865XZ4',
    path: '/features/workout/list_of_exercise/list_of_back/incline_dumbbell_row',
  },
  {
    title: 'Single Arm Dumbbell Row',
    embedUrl: 'https://www.youtube.com/embed/DMo3HJoawrU?si=rFoE_YOSHgfSe6il',
    path: '/features/workout/list_of_exercise/list_of_back/single_arm_dumbbell_row',
  },
  {
    title: 'Straight Arm Pull Down',
    embedUrl: 'https://www.youtube.com/embed/G9uNaXGTJ4w?si=EisrB47rv1OzoUfw',
    path: '/features/workout/list_of_exercise/list_of_back/straight_arm_pull_down',
  },
  {
    title: 'Underhand Pulldown',
    embedUrl: 'https://www.youtube.com/embed/VprlTxpB1rk?si=1WJA-FlpbXCAcBAO',
    path: '/features/workout/list_of_exercise/list_of_back/underhand_pulldown',
  },
];

const BackExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Back Exercises</h1>
        <div className={styles.grid}>
          {backExercises.map((exercise, index) => (
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
                  <div className={styles.clickOverlay}></div> {/* this is what makes it clickable instead of playable */}
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

export default BackExerciseList;
