'use client';

import React, { useState, useEffect } from 'react';
import styles from "../styles/Footer.module.css";

const LandingFooter = () => {
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
      <p>Copyright © Yohannes Addmasie | 2025</p>
    </footer>
  );
};

export default LandingFooter;
