'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../../styles/login.module.css';

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';  // Default to home page
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting to sign in with:', { email });
      const result = await login(email, password);

      console.log('Sign in result:', result);

      if (!result.success) {
        setError(result.error || 'Invalid email or password');
      } else {
        console.log('Login successful, redirecting to:', result.redirectTo || callbackUrl);

        // Use Next.js router for redirection instead of window.location
        router.push(result.redirectTo || callbackUrl);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background image includes navbar */}
      <Navbar />

      <main className={styles.page}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Get Started Now!</h2>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <label>Email address</label>
          <input
            type="email"
            placeholder="Your email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.togglePassword}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className={styles.formOptions}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/auth/reset_password/email_input" className={styles.forgotLink}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <p className={styles.signupText}>
            Don’t have an account? <a href="/auth/signup">Sign up</a>
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
