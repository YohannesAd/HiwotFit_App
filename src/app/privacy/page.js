'use client';
import React from 'react';
import styles from '../styles/Privacy.module.css';
import { useRouter } from 'next/navigation';
import navbarStyles from '../styles/Navbar.module.css';

const Privacy = () => {
  const router = useRouter();
  return (
    <div className={styles.privacyContainer}>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <button onClick={() => router.back()} className={navbarStyles.backButton} style={{ marginBottom: 16 }}>
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