'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/List_of_all_exercise.module.css'; // shared CSS

const shoulderExercises = [
  {
    title: 'Lateral Raise',
    embedUrl: 'https://www.youtube.com/embed/OuG1smZTsQQ?si=EaAdUx12p4Hj99hO',
    path: '/features/workout/list_of_exercise/list_of_shoulder/lateral_raise',
  },
  {
    title: 'Machine Shoulder Press',
    embedUrl: 'https://www.youtube.com/embed/WvLMauqrnK8?si=UubLuSEOetdKMlbx',
    path: '/features/workout/list_of_exercise/list_of_shoulder/machine_shoulder_press',
  },
  {
    title: 'Seated Dumbbell Shoulder Press',
    embedUrl: 'https://www.youtube.com/embed/HzIiNhHhhtA?si=ZM1BCq61I1_FW43v',
    path: '/features/workout/list_of_exercise/list_of_shoulder/seated_dumbbell_press',
  },
  {
    title: 'Machine Reverse Flye',
    embedUrl: 'https://www.youtube.com/embed/5YK4bgzXDp0?si=IzhdiC6LqaDO4nsv',
    path: '/features/workout/list_of_exercise/list_of_shoulder/machine_reverse_flye',
  },
  {
    title: 'Seated Barbell Press',
    embedUrl: 'https://www.youtube.com/embed/IuzRCN6eG6Y?si=gVvBREY9HCE_M_-W',
    path: '/features/workout/list_of_exercise/list_of_shoulder/seated_barbell_press',
  },
  {
    title: 'Incline Dumbbell Face Pull',
    embedUrl: 'https://www.youtube.com/embed/90cE3rCLtmo?si=Hv1_qUCq9jjT8tcs',
    path: '/features/workout/list_of_exercise/list_of_shoulder/incline_dumbbell_face_pull',
  },
  {
    title: 'Kneeling Cable Face Pull',
    embedUrl: 'https://www.youtube.com/embed/8CGMuud1ANw?si=APEXE4rkqfG61VZo',
    path: '/features/workout/list_of_exercise/list_of_shoulder/kneeling_cable_face_pull',
  },
  {
    title: 'Leaning Cable Lateral Raise',
    embedUrl: 'https://www.youtube.com/embed/lq7eLC30b9w?si=P3LWnObYorOWFx8V',
    path: '/features/workout/list_of_exercise/list_of_shoulder/leaning_cable_lateral_raise',
  },
  {
    title: 'Machine Lateral Raise',
    embedUrl: 'https://www.youtube.com/embed/0o07iGKUarI?si=A-Q6Wo7H0E5jbM7G',
    path: '/features/workout/list_of_exercise/list_of_shoulder/machine_lateral_raise',
  },
];

const ShoulderExerciseList = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>Shoulder Exercises</h1>
        <div className={styles.grid}>
          {shoulderExercises.map((exercise, index) => (
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

export default ShoulderExerciseList;
