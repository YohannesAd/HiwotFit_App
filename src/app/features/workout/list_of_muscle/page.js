'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../../../styles/list_of_muscle.module.css';

const MuscleListPage = () => {
  return (
    // Parent container: makes the page stretch full height & flex to keep footer at bottom
    <div className={styles.pageWrapper}>
      {/* Top navigation bar */}
      <Navbar />

      {/* Main content of the page */}
      <main className={styles.pageContent}>
        {/* Page title */}
        <h1 className={styles.title}>Full Body Exercise</h1>

        {/* Grid of muscle groups */}
        <div className={styles.grid}>
          {/* Muscle group: Chest */}
          <div className={styles.item}>
            <p className={styles.label}>Chest</p>
            <Image src="/assets/chest.png" alt="Chest" width={350} height={200} />
          </div>

          {/* Muscle group: Back */}
          <div className={styles.item}>
            <p className={styles.label}>Back</p>
            <Image src="/assets/arnolds_back_600x 1.png" alt="Back" width={350} height={200} />
          </div>

          {/* Muscle group: Shoulder */}
          <div className={styles.item}>
            <p className={styles.label}>Shoulder</p>
            <Image src="/assets/shoulder.png" alt="Shoulder" width={350} height={200} />
          </div>

          {/* Muscle group: Biceps */}
          <div className={styles.item}>
            <p className={styles.label}>Biceps</p>
            <Image src="/assets/bicpes.png" alt="Biceps" width={350} height={200} />
          </div>

          {/* Muscle group: Triceps */}
          <div className={styles.item}>
            <p className={styles.label}>Triceps</p>
            <Image src="/assets/triceps-extensions0 1.png" alt="Triceps" width={350} height={200} />
          </div>

          {/* Muscle group: Leg */}
          <div className={styles.item}>
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

