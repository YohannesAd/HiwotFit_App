'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Email_input_password.module.css';

const EmailInputPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setError('');
    setIsLoading(true);

    try {
      // Call the API to request password reset
      const response = await fetch('/api/auth/reset-password/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      // Show success message
      setSuccess(true);

      // Store email in sessionStorage for the next step
      sessionStorage.setItem('resetEmail', email);

      // Redirect to verification page after a short delay
      setTimeout(() => {
        router.push('/auth/reset_password/vefication_input');
      }, 2000);
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setError(err.message || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.page}>
        <form className={styles.resetForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Reset Your Password</h2>
          <p className={styles.subtitle}>Enter your email to receive a verification code</p>

          {error && <p className={styles.errorText}>{error}</p>}
          {success && <p className={styles.successText}>Verification code sent! Redirecting...</p>}

          <input
            type="email"
            placeholder="Your email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default EmailInputPage;
