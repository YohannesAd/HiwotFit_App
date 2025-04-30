'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/change_password.module.css';

const ChangePasswordPage = () => {
  const router = useRouter();

  // State for form fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password validation
  const validatePassword = () => {
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  // Handle form submission
  // Get reset token from sessionStorage
  useEffect(() => {
    const resetToken = sessionStorage.getItem('resetToken');
    if (!resetToken) {
      // Redirect back to email input if no token is found
      router.push('/auth/reset_password/email_input');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setError('');

    // Validate passwords
    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);

    try {
      const resetToken = sessionStorage.getItem('resetToken');

      if (!resetToken) {
        throw new Error('Reset token not found. Please restart the password reset process.');
      }

      // Call the API to reset the password
      const response = await fetch('/api/auth/reset-password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resetToken,
          newPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      // Clear session storage
      sessionStorage.removeItem('resetEmail');
      sessionStorage.removeItem('resetToken');

      // Redirect to confirmation page
      router.push('/auth/reset_password/passwrod_change_confirmation');
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.message || 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.page}>
        <form className={styles.passwordForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Create New Password</h2>
          <p className={styles.subtitle}>Your new password must be different from previous passwords</p>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.inputGroup}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New password"
              className={styles.inputField}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? '🔒' : '👁️'}
            </button>
          </div>

          <div className={styles.inputGroup}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              className={styles.inputField}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🔒' : '👁️'}
            </button>
          </div>

          <div className={styles.passwordRequirements}>
            <p>Password requirements:</p>
            <ul>
              <li>At least 8 characters long</li>
              <li>Include both uppercase and lowercase letters</li>
              <li>Include at least one number</li>
            </ul>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
