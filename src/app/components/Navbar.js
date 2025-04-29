'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if user is logged in
  const isLoggedIn = !!user;

  // Debug logging
  console.log('Navbar - Auth State:', { user, isLoggedIn, loading });

  // Toggle user menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.navbar}>
      {/* App Logo */}
      <div className={styles.logoContainer}
      onClick={() => router.push('/')}
      style={{ cursor: 'pointer' }} // Make cursor a pointer

      >
        <Image
          src="/assets/logo-transparent-png 1.png"
          alt="App Logo"
          width={50}
          height={50}
          className={styles.logo}
        />
      </div>

      {pathname !== '/' && (
        <button onClick={() => router.back()} className={styles.backButton}>
          ←
        </button>
      )}



      {/* Navigation Links */}
      <div className={styles.navLinks}>
        {/* Home navigates to the landing page */}
        <a className={styles.link} onClick={() => router.push('/')}>
          Home
        </a>

        {/* Workout navigates to list of muscles */}
        <a className={styles.link} onClick={() => router.push('/features/workout/list_of_muscle')}>
          Workout
        </a>

        {/* Track Calories link — update with route later */}
        <a className={styles.link} onClick={() => router.push('/features/calories/personal_information_box')}>
          Track Calories
        </a>
        </div>

      {/* Conditional rendering based on authentication state */}
      {isLoggedIn ? (
        <div className={styles.userMenu}>
          <button
            className={styles.userButton}
            onClick={toggleMenu}
          >
            {user.name || user.email}
          </button>

          {isMenuOpen && (
            <div className={styles.dropdown}>
              <a
                className={styles.dropdownItem}
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </a>
              <a
                className={styles.dropdownItem}
                onClick={() => router.push('/profile')}
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className={styles.dropdownItem}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        // Only show "Sign In" if NOT on login or related pages
        ![
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
        )
      )}

</div>

  );
};

export default Navbar;
