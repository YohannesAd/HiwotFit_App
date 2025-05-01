'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');

  // Check if user is logged in
  const isLoggedIn = !!user;

  // Debug logging
  console.log('Navbar - Auth State:', { user, isLoggedIn, loading });

  // Update profile picture when user changes
  useEffect(() => {
    if (user && user.profilePicture) {
      console.log('Navbar - User profile picture updated:', user.profilePicture);
      setProfilePic(user.profilePicture);
    } else {
      setProfilePic('');
    }
  }, [user]);

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
        <img
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
        <div className={styles.userSection}>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>

          <div className={styles.userMenu}>
            <div
              className={styles.profilePicture}
              onClick={toggleMenu}
            >
              {profilePic ? (
                // Use img tag instead of Next.js Image component for data URIs
                <img
                  key={profilePic} // Add key to force re-render when src changes
                  src={profilePic}
                  alt={user.name || 'User'}
                  width={40}
                  height={40}
                  className={styles.userAvatar}
                />
              ) : (
                <div className={styles.defaultAvatar}>
                  {(user.name || user.email || '?').charAt(0).toUpperCase()}
                </div>
              )}
            </div>

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
                <a
                  className={styles.dropdownItem}
                  onClick={() => router.push('/favorites')}
                >
                  My Favorites
                </a>
              </div>
            )}
          </div>
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
