'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../../../styles/list_of_muscle.module.css';

const MuscleListPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.pageContent}>
        <h1 className={styles.title}>Full Body Exercise</h1>

        <div className={styles.grid}>
          {/* Chest */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_chest')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Chest</p>
            <Image src="/assets/chest.png" alt="Chest" width={350} height={200} />
          </div>

          {/* Back */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_back')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Back</p>
            <Image src="/assets/arnolds_back_600x 1.png" alt="Back" width={350} height={200} />
          </div>

          {/* Shoulder */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_shoulder')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Shoulder</p>
            <Image src="/assets/shoulder.png" alt="Shoulder" width={350} height={200} />
          </div>

          {/* Biceps */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_biceps')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Biceps</p>
            <Image src="/assets/bicpes.png" alt="Biceps" width={350} height={200} />
          </div>

          {/* Triceps */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_triceps')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Triceps</p>
            <Image src="/assets/triceps-extensions0 1.png" alt="Triceps" width={350} height={200} />
          </div>

          {/* Leg */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_leg')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Leg</p>
            <Image src="/assets/arnold-squats 1.png" alt="Leg" width={350} height={200} />
          </div>

          {/* Core */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_core')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Core</p>
            <Image src="/assets/core.jpg" alt="Core" width={350} height={200} />
          </div>

          {/* Calf */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_calf')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Calf</p>
            <Image src="/assets/calf.jpg" alt="Calf" width={350} height={200} />
          </div>

          {/* Glutes */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_glutes')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Glutes</p>
            <Image src="/assets/Glutes.jpg" alt="Glutes" width={350} height={200} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MuscleListPage;
