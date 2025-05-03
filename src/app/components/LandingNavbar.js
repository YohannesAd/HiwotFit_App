'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from "../styles/Navbar.module.css";

const LandingNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use a simple structure during SSR to prevent hydration issues
  if (!isMounted) {
    return (
      <div className={styles.navbar} suppressHydrationWarning>
        <div className={styles.logoContainer}>
          <div className={styles.logo} style={{ width: '120px', height: '120px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.navbar} suppressHydrationWarning>
      {/* App Logo */}
      <div className={styles.logoContainer} onClick={() => router.push('/')}>
        <Image
          src="/assets/Black and Beige Fitness Sports Club Logo.png"
          alt="HiwotFit Logo"
          width={120}
          height={120}
          className={styles.logo}
          priority
        />
      </div>

      {/* Only show "Sign In" if NOT on login or related pages */}
      {![
        '/auth/login',
        '/auth/reset_password/email_input',
        '/auth/reset_password/vefication_input',
        '/auth/reset_password/passwrod_change_confirmation'
      ].includes(pathname) && (
        <button
          className={styles.signinButton}
          onClick={() => router.push('/auth/login')}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default LandingNavbar;
