'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // <-- Import router
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Email_input_password.module.css';

const EmailInputPage = () => {
  const router = useRouter(); // <-- Initialize router

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent actual form submission
    router.push('/auth/reset_password/vefication_input'); // <-- Navigate to verification input page
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.page}>
        <form className={styles.resetForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Reset Your Password</h2>
          <p className={styles.subtitle}>Enter your email to receive a reset link</p>

          <input
            type="email"
            placeholder="Your email"
            className={styles.inputField}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Send Reset Link
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default EmailInputPage;
