'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

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
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <div className={styles.brand}>
            <Image
              src="/assets/Black and Beige Fitness Sports Club Logo.png"
              alt="HiwotFit Logo"
              width={60}
              height={60}
              className={styles.logo}
            />
            <span className={styles.brandName}>HiwotFit</span>
          </div>
          <p className={styles.brandDescription}>
            Transform your fitness journey with personalized workouts, expert nutrition guidance,
            and comprehensive progress tracking.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Follow us on Facebook" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="Follow us on Twitter" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" aria-label="Follow us on Instagram" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
              </svg>
            </a>
            <a href="#" aria-label="Follow us on LinkedIn" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linksSection}>
          <h4 className={styles.sectionTitle}>Quick Links</h4>
          <nav className={styles.linksList}>
            <button onClick={() => router.push('/about')} className={styles.footerLink}>About Us</button>
            <button onClick={() => router.push('/contact')} className={styles.footerLink}>Contact</button>
            <button onClick={() => router.push('/privacy')} className={styles.footerLink}>Privacy Policy</button>
            <a href="#features" className={styles.footerLink}>Features</a>
            <a href="#how-it-works" className={styles.footerLink}>How It Works</a>
          </nav>
        </div>

        {/* Support */}
        <div className={styles.linksSection}>
          <h4 className={styles.sectionTitle}>Support</h4>
          <nav className={styles.linksList}>
            <button onClick={() => router.push('/contact')} className={styles.footerLink}>Help Center</button>
            <button onClick={() => router.push('/contact')} className={styles.footerLink}>Contact Support</button>
            <a href="#faq" className={styles.footerLink}>FAQ</a>
            <button onClick={() => router.push('/auth/signup')} className={styles.footerLink}>Get Started</button>
          </nav>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletterSection}>
          <h4 className={styles.sectionTitle}>Stay Updated</h4>
          <p className={styles.newsletterDescription}>
            Get the latest fitness tips and updates delivered to your inbox.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
              aria-label="Email address for newsletter"
            />
            <button className={styles.subscribeButton} aria-label="Subscribe to newsletter">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.copyright}>
          <p>&copy; 2025 HiwotFit by Yohannes Addmasie. All rights reserved.</p>
        </div>
        <div className={styles.bottomLinks}>
          <button onClick={() => router.push('/privacy')} className={styles.bottomLink}>Privacy</button>
          <button onClick={() => router.push('/contact')} className={styles.bottomLink}>Terms</button>
          <button onClick={() => router.push('/contact')} className={styles.bottomLink}>Support</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
