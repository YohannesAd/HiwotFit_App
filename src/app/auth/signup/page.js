'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '../../styles/signup.module.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.page}>
        <form className={styles.signupForm}>
          <h2 className={styles.title}>Create Account</h2>

          <label>First name</label>
          <input type="text" placeholder="Your first name" className={styles.inputField} />

          <label>Last name</label>
          <input type="text" placeholder="Your last name" className={styles.inputField} />

          <label>Email address</label>
          <input type="email" placeholder="Your email" className={styles.inputField} />

          <label>New password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Must be 8 characters"
              className={styles.inputField}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.togglePassword}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <label>Confirm password</label>
          <input type="password" placeholder="Repeat password" className={styles.inputField} />

          <button className={styles.submitButton}>Submit</button>

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
