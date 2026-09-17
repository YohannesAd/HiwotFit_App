'use client';
import { useState, useEffect } from 'react';
import RippleButton from './RippleButton';
import styles from '../styles/BackToTop.module.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}>
      <RippleButton
        onClick={scrollToTop}
        className={styles.backToTopButton}
        variant="outline"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
          <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </RippleButton>
    </div>
  );
};

export default BackToTop;
