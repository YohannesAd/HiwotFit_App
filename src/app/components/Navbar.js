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
  if (typeof window !== 'undefined') {
    console.log('Navbar - Auth State:', {
      user,
      isLoggedIn,
      loading,
      hasProfilePic: user?.profilePicture ? 'Yes' : 'No',
      profilePicLength: user?.profilePicture?.length
    });
  }

  // Toggle user menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    console.log('Navbar - Logout button clicked');
    setIsMenuOpen(false); // Close any open menus
    await logout();
    console.log('Navbar - Logout completed');
  };

  return (
    <div className={styles.navbar} suppressHydrationWarning>
      {/* Left section: Logo and Back Button */}
      <div className={styles.leftSection}>
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

        {pathname !== '/' && pathname !== '/home' && (
          <button onClick={() => router.back()} className={styles.backButton}>
            ← Back
          </button>
        )}
      </div>



      {/* Navigation Links - Hide on landing page and all auth-related pages */}
      {(!pathname.startsWith('/auth') && pathname !== '/') && (
        <div className={styles.navLinks}>
          {/* Home navigates to the landing page or home page based on auth status */}
          <a className={styles.link} onClick={() => router.push(isLoggedIn ? '/home' : '/')}>
            Home
          </a>

          {/* Workout navigates to list of muscles */}
          <a className={styles.link} onClick={() => router.push('/features/workout/list_of_muscle')}>
            Workout
          </a>

          {/* Track Calories link */}
          <a className={styles.link} onClick={() => router.push('/features/calories/personal_information_box')}>
            Track Calories
          </a>
        </div>
      )}

      {/* Conditional rendering based on authentication state */}
      {isLoggedIn ? (
        <div className={styles.userControls}>
          {/* Logout button on the left */}
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>

          {/* User profile picture/icon with dropdown */}
          <div className={styles.userMenu}>
            <button
              className={styles.profileButton}
              onClick={toggleMenu}
            >
              <div className={styles.profilePicture}>
                {/* If we have a profile picture, show it, otherwise show initials */}
                {user.profilePicture ? (
                  <img
                    key={user.profilePicture.substring(0, 50)} // Force re-render when image changes
                    src={user.profilePicture}
                    alt="Profile"
                    className={styles.profileImage}
                    onLoad={() => console.log('Navbar - Profile image loaded successfully')}
                    onError={(e) => {
                      console.error('Navbar - Profile image failed to load:', e);
                      console.log('Navbar - Image src length:', user.profilePicture?.length);
                    }}
                  />
                ) : (
                  <div className={styles.profileInitials}>
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </button>

            {isMenuOpen && (
              <div className={styles.dropdown}>
                <a
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/dashboard');
                  }}
                >
                  Dashboard
                </a>
                <a
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/profile');
                  }}
                >
                  Profile
                </a>
                <a
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/workout-history');
                  }}
                >
                  Workout History
                </a>
                <a
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/favorites');
                  }}
                >
                  My Favorites
                </a>
                <a
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/notes');
                  }}
                >
                  Notes
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
