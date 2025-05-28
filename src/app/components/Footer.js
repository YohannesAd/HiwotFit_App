'use client';

import React, { useState, useEffect } from 'react';

import styles from "../styles/Footer.module.css";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use a simple structure during SSR to prevent hydration issues
  if (!isMounted) {
    return (
      <footer className={styles.footer} suppressHydrationWarning>
        <p>Copyright © Yohannes Addmasie | 2025</p>
      </footer>
    );
  }

  return (
    <footer className={styles.footer} suppressHydrationWarning>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          
          <img src="/assets/Black and Beige Fitness Sports Club Logo.png" alt="HiwotFit Logo" className={styles.logo} />
          <span>HiwotFit</span>
        </div>
        <nav className={styles.links}>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </div>
      <div className={styles.copyright}>
        <p>Copyright © Yohannes Addmasie | 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
