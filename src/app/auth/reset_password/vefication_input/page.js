'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/verfication_input.module.css';

const VerificationInputPage = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can validate code input here if needed
    router.push('/auth/reset_password/passwrod_change_confirmation');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.page}>
        <form className={styles.resetForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Enter Verification Code</h2>
          <p className={styles.subtitle}>
            We've sent a 6-digit verification code to your email.
          </p>

          <input
            type="text"
            placeholder="Enter code"
            className={styles.inputField}
            maxLength={6}
          />

          <button type="submit" className={styles.submitBtn}>
            Verify Code
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default VerificationInputPage;
