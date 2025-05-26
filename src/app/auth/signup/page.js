'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../../styles/signup.module.css';

const Signup = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true when component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Log the request for debugging
      const requestBody = {
        name: `${firstName} ${lastName}`,
        username: email.split('@')[0] + Math.floor(Math.random() * 1000), // Generate a username
        email,
        password,
      };
      if (typeof window !== 'undefined') {
        console.log('Sending registration request:', requestBody);
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (typeof window !== 'undefined') {
        console.log('Response status:', response.status);
      }

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Registration failed with status: ${response.status}`);
        } else {
          // If not JSON, get text content for debugging
          const textContent = await response.text();
          if (typeof window !== 'undefined') {
            console.error('Non-JSON response:', textContent);
          }
          throw new Error(`Server returned non-JSON response with status: ${response.status}`);
        }
      }

      // Parse JSON only if response is OK
      const data = await response.json();
      if (typeof window !== 'undefined') {
        console.log('Registration successful:', data);
      }

      setSuccess('Registration successful! Redirecting to login...');

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      if (typeof window !== 'undefined') {
        console.error('Registration error:', error);
      }
      setError(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper} suppressHydrationWarning>
      <Navbar />

      <main className={styles.page}>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Create Account</h2>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          {success && (
            <div className={styles.successMessage}>
              {success}
            </div>
          )}

          <label className={styles.formLabel}>First name</label>
          <input
            type="text"
            placeholder="Your first name"
            className={styles.inputField}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label className={styles.formLabel}>Last name</label>
          <input
            type="text"
            placeholder="Your last name"
            className={styles.inputField}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label className={styles.formLabel}>Email address</label>
          <input
            type="email"
            placeholder="Your email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.formLabel}>New password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Must be 6+ characters"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.togglePassword}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <label className={styles.formLabel}>Confirm password</label>
          <input
            type="password"
            placeholder="Repeat password"
            className={styles.inputField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Submit'}
          </button>

          <p className={styles.loginRedirect}>
            Already have an account? <a href="/auth/login">Log in</a>
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
