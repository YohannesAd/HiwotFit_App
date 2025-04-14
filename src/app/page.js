'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Image from 'next/image';
import styles from "../app/styles/LandingPage.module.css";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className={styles.landingPage}>
      <Navbar router={router} />
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Unleash Your Strength, Discover Your Potential</h1>
        <p className={styles.heroSubtitle}>
          "It's a shame for a man to grow old without ever seeing the beauty and strength of which his body is capable."
        </p>
        <button
          className={styles.startButton}
          onClick={() => router.push('/auth/login')}
        >
          Start Your Journey
        </button>

        <div className={styles.features}>
          <div className={styles.feature}>
            <Image src="/assets/workout.png" alt="Workout Videos" width={50} height={50} />
            <h3 className={styles.featureTitle}>Workout Videos</h3>
            <p className={styles.featureDescription}>Guided exercises for every muscle group.</p>
          </div>
          <div className={styles.feature}>
            <Image src="/assets/calories.png" alt="Calorie Tracking" width={50} height={42} />
            <h3 className={styles.featureTitle}>Calorie Tracking</h3>
            <p className={styles.featureDescription}>Personalized daily calorie recommendations.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
