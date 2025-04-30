'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/verfication_input.module.css';

const VerificationInputPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Get email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect back to email input if no email is found
      router.push('/auth/reset_password/email_input');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setError('');
    setIsLoading(true);

    try {
      // Call the API to verify the code
      const response = await fetch('/api/auth/reset-password/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      // Show success message
      setSuccess(true);

      // Store reset token in sessionStorage for the next step
      sessionStorage.setItem('resetToken', data.resetToken);

      // Redirect to password change page after a short delay
      setTimeout(() => {
        router.push('/auth/reset_password/change_password_input');
      }, 2000);
    } catch (err) {
      console.error('Error verifying code:', err);
      setError(err.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.page}>
        <form className={styles.verifyForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Enter Verification Code</h2>
          <p className={styles.subtitle}>
            We've sent a 6-digit verification code to your email.
          </p>

          {error && <p className={styles.errorText}>{error}</p>}
          {success && <p className={styles.successText}>Code verified! Redirecting...</p>}

          {email && <p className={styles.emailInfo}>Code sent to: {email}</p>}

          <input
            type="text"
            placeholder="Enter code"
            className={styles.inputField}
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default VerificationInputPage;
