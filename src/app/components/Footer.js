'use client';

import React from 'react';

import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} suppressHydrationWarning>
      <div className={styles.footerContent}>

        <p>Copyright © Yohannes Addmasie | 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
