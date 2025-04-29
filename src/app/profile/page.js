'use client';

/**
 * Profile Page
 *
 * This page displays the user's profile information.
 * It is protected and only accessible to authenticated users.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import styles from '@/app/styles/Profile.module.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  // State for profile form
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Update form values when user data is available
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
    }
  }, [user]);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      // Call the updateProfile function from AuthContext
      const result = await updateProfile({ name, username });

      if (result.success) {
        setMessage('Profile updated successfully!');
      } else {
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle save and return
  const handleSaveAndReturn = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      // Call the updateProfile function from AuthContext
      const result = await updateProfile({ name, username });

      if (result.success) {
        // Redirect to landing page
        window.location.href = '/';
      } else {
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          <h1 className={styles.title}>Your Profile</h1>

          {user && (
            <div className={styles.profileContainer}>
              <div className={styles.profileHeader}>
                <h2>Account Information</h2>
                <p className={styles.email}>{user.email}</p>
              </div>

              <form className={styles.profileForm} onSubmit={handleUpdateProfile}>
                {message && <p className={styles.successMessage}>{message}</p>}
                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.updateButton}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAndReturn}
                    className={styles.saveReturnButton}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save & Return to Home'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
