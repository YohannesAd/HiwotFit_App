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
          {/* Chest - Clickable */}
          <div
            className={styles.muscleCard}
            onClick={() => router.push('/features/workout/list_of_exercise/list_of_chest')}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>Chest</p>
            <Image src="/assets/chest.png" alt="Chest" width={350} height={200} />
          </div>

          {/* Back */}
          <div className={styles.muscleCard}
               onClick={() => router.push('/features/workout/list_of_exercise/list_of_back')}
               style={{ cursor: 'pointer' }}
          
          >
            <p className={styles.label}>Back</p>
            <Image src="/assets/arnolds_back_600x 1.png" alt="Back" width={350} height={200} />
          </div>

          {/* Shoulder */}
          <div className={styles.muscleCard}>
            <p className={styles.label}>Shoulder</p>
            <Image src="/assets/shoulder.png" alt="Shoulder" width={350} height={200} />
          </div>

          {/* Biceps */}
          <div className={styles.muscleCard}>
            <p className={styles.label}>Biceps</p>
            <Image src="/assets/bicpes.png" alt="Biceps" width={350} height={200} />
          </div>

          {/* Triceps */}
          <div className={styles.muscleCard}>
            <p className={styles.label}>Triceps</p>
            <Image src="/assets/triceps-extensions0 1.png" alt="Triceps" width={350} height={200} />
          </div>

          {/* Legs */}
          <div className={styles.muscleCard}>
            <p className={styles.label}>Leg</p>
            <Image src="/assets/arnold-squats 1.png" alt="Leg" width={350} height={200} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MuscleListPage;
