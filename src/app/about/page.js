'use client';
import React from 'react';
import styles from '../styles/About.module.css';
import { useRouter } from 'next/navigation';
import navbarStyles from '../styles/Navbar.module.css';

const About = () => {
  const router = useRouter();
  return (
    <div className={styles.aboutContainer}>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <button onClick={() => router.back()} className={navbarStyles.backButton} style={{ marginBottom: 16 }}>
          ← Back
        </button>
      </div>
      <h1 className={styles.aboutTitle}>About HiwotFit</h1>
      <p className={styles.aboutText}>
        HiwotFit is the beginning of a vision created by a developer with over a year's hands-on experience in the fitness world. I've been passionate about fitness since I was 13 years old, and now I'm combining that real-world knowledge with my skills in software development to build tools that truly help people transform their lives.
      </p>
      <p className={styles.aboutText}>
        This is version one of HiwotFit—a starting point. Right now, it helps users track workouts, monitor progress, and stay consistent, but it's only the beginning. Over time, HiwotFit will evolve into a full-scale fitness platform, available on every device, with features like personalized coaching, AI-driven meal planning, smart progress tracking, and more.
      </p>
      <p className={styles.aboutText}>
        This app is built by someone who lives the lifestyle—for those who want to level up physically and mentally. HiwotFit isn't just an app. It's a long-term mission.
      </p>
      <p className={styles.aboutText}>
        Stay tuned. There's so much more to come.
      </p>
    </div>
  );
};

export default About; 