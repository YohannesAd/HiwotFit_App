'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/password_changed.module.css';

const PasswordChangedConfirmation = () => {
  const router = useRouter();

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.page}>
        <div className={styles.confirmationBox}>
          <h2 className={styles.title}>Your password has been changed successfully</h2>
          <p className={styles.subtitle}>Password changed</p>

          <button
            className={styles.backBtn}
            onClick={() => router.push('/auth/login')}
          >
            Back to Login
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PasswordChangedConfirmation;
