'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../../styles/login.module.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      {/* Background image includes navbar */}
      <Navbar />

      <main className={styles.page}>
        <form className={styles.loginForm}>
          <h2 className={styles.formTitle}>Get Started Now!</h2>

          <label>Email address</label>
          <input type="email" placeholder="Your email" className={styles.inputField} />

          <label>Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.inputField}
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

          <button className={styles.loginBtn}>Log in</button>

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
