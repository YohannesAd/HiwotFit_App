'use client';
import React from 'react';
import styles from '../styles/Contact.module.css';
import { useRouter } from 'next/navigation';
import navbarStyles from '../styles/Navbar.module.css';

const Contact = () => {
  const router = useRouter();
  return (
    <div className={styles.contactContainer}>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <button onClick={() => router.back()} className={navbarStyles.backButton} style={{ marginBottom: 16 }}>
          ← Back
        </button>
      </div>
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <p className={styles.contactText}>
        Have questions or feedback? Fill out the form below or email us at 
        <a href="mailto:yohannes.30belachew@gmail.com" style={{ color: '#e38e0f' }}>HiwotFit Support</a> 
      </p>
      <form className={styles.contactForm} onSubmit={e => { e.preventDefault(); alert('Thank you for your feedback!'); }}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Your Name"
          name="name"
          required
        />
        <input
          type="email"
          className={styles.inputField}
          placeholder="Your Email"
          name="email"
          required
        />
        <textarea
          className={`${styles.inputField} ${styles.textArea}`}
          placeholder="Your Feedback"
          name="feedback"
          required
        />
        <button type="submit" className={styles.submitButton}>Send Feedback</button>
      </form>
    </div>
  );
};

export default Contact; 