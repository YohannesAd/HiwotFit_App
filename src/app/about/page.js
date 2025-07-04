'use client';
import React from 'react';
import styles from '../styles/About.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import navbarStyles from '../styles/Navbar.module.css';
import Image from 'next/image';

// About page for HiwotFit
// This page introduces the app, its vision, and the developer. It includes branding and a call-to-action for contacting the developer.

const About = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Smart navigation function that goes to the appropriate home page
  const handleBackNavigation = () => {
    // If user is authenticated, go to /home, otherwise go to landing page
    const targetPage = user ? '/home' : '/';
    router.push(targetPage);
  };
  return (
    // Main container for About page content
    <div className={styles.aboutContainer}>
      {/* Logo section for branding */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Image
          src="/assets/Black and Beige Fitness Sports Club Logo.png"
          alt="HiwotFit Logo"
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
      </div>
      {/* Back button for easy navigation */}
      <div style={{ width: '100%', textAlign: 'left' }}>
        <button onClick={handleBackNavigation} className={navbarStyles.backButton} style={{ marginBottom: 16 }}>
          ← Back
        </button>
      </div>
      {/* Main title for the About page */}
      <h1 className={styles.aboutTitle}>About HiwotFit</h1>
      {/* App description paragraphs. These explain the vision, background, and future plans. */}
      <p className={styles.aboutText}>
        HiwotFit is the beginning of a vision created by a developer with over a year&apos;s hands-on experience in the fitness world. I&apos;ve been passionate about fitness since I was 13 years old, and now I&apos;m combining that real-world knowledge with my skills in software development to build tools that truly help people transform their lives.
      </p>
      <p className={styles.aboutText}>
        This is version one of HiwotFit—a starting point. Right now, it helps users track workouts, monitor progress, and stay consistent, but it&apos;s only the beginning. Over time, HiwotFit will evolve into a full-scale fitness platform, available on every device, with features like personalized coaching, AI-driven meal planning, smart progress tracking, and more.
      </p>
      <p className={styles.aboutText}>
        This app is built by someone who lives the lifestyle—for those who want to level up physically and mentally. HiwotFit isn&apos;t just an app. It&apos;s a long-term mission.
      </p>
      <p className={styles.aboutText}>
        Stay tuned. There&apos;s so much more to come.
      </p>
      {/* Call-to-action button: routes to the contact page for feedback or inquiries */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <button
          className={styles.contactButton}
          onClick={() => router.push('/contact')}
          aria-label="Contact the developer"
        >
          Contact the Developer
        </button>
      </div>
    </div>
  );
};


export default About; 