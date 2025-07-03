'use client';
import React from 'react';
import styles from '../styles/Privacy.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import navbarStyles from '../styles/Navbar.module.css';

const Privacy = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Smart navigation function that goes to the appropriate home page
  const handleBackNavigation = () => {
    // If user is authenticated, go to /home, otherwise go to landing page
    const targetPage = user ? '/home' : '/';
    router.push(targetPage);
  };

  return (
    <div className={styles.privacyContainer}>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <button onClick={handleBackNavigation} className={navbarStyles.backButton} style={{ marginBottom: 16 }}>
          ← Back
        </button>
      </div>
      <h1 className={styles.privacyTitle}>Privacy Policy</h1>
      <p className={styles.privacyText}>
        We value your privacy. Read our Privacy Policy to learn how we collect, use, and protect your information.
      </p>
    </div>
  );
};

export default Privacy; 