'use client';

/**
 * Profile Page
 *
 * This page displays the user's profile information.
 * It is protected and only accessible to authenticated users.
 */

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import styles from '@/app/styles/Profile.module.css';

const ProfilePage = () => {
  const { user, updateProfile, updateProfilePicture } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  // State for profile form
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  // Update form values when user data is available
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      setProfilePicture(user.profilePicture || '');
      setPreviewImage(user.profilePicture || '');
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
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      } else {
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
      setIsLoading(false);
    }
  };

  // Handle profile picture click
  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      console.log('Not in browser environment, skipping file processing');
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      // Compress the image before setting it
      const img = new window.Image(); // Use window.Image to be explicit
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Get compressed image data - use higher compression for smaller file size
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
        console.log('Image compressed. Original size:', event.target.result.length, 'Compressed size:', compressedDataUrl.length);

        // Check if the compressed image is still too large (> 500KB)
        if (compressedDataUrl.length > 500 * 1024) {
          // Try with even higher compression
          const moreCompressedDataUrl = canvas.toDataURL('image/jpeg', 0.3);
          console.log('Further compressed. Size:', moreCompressedDataUrl.length);
          setPreviewImage(moreCompressedDataUrl);
        } else {
          setPreviewImage(compressedDataUrl);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle profile picture update
  const handleUpdateProfilePicture = async () => {
    if (!previewImage || previewImage === profilePicture) return;

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      console.log('Updating profile picture...');

      // Call the updateProfilePicture function from AuthContext
      const result = await updateProfilePicture(previewImage);
      console.log('Profile picture update result:', result);

      if (result.success) {
        setProfilePicture(previewImage);
        setMessage('Profile picture updated successfully!');

        // Force a refresh of the page to ensure the navbar updates
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        throw new Error(result.error || 'Failed to update profile picture');
      }
    } catch (err) {
      console.error('Error updating profile picture:', err);
      setError(err.message || 'Failed to update profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profile picture removal
  const handleRemoveProfilePicture = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      console.log('Removing profile picture...');

      // Call the updateProfilePicture function with empty string
      const result = await updateProfilePicture('');
      console.log('Profile picture removal result:', result);

      if (result.success) {
        setProfilePicture('');
        setPreviewImage('');
        setMessage('Profile picture removed successfully!');

        // Force a refresh of the page to ensure the navbar updates
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        throw new Error(result.error || 'Failed to remove profile picture');
      }
    } catch (err) {
      console.error('Error removing profile picture:', err);
      setError(err.message || 'Failed to remove profile picture');
    } finally {
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

              {message && <p className={styles.successMessage}>{message}</p>}
              {error && <p className={styles.errorMessage}>{error}</p>}

              <div className={styles.profilePictureSection}>
                <h3>Profile Picture</h3>
                <div className={styles.pictureContainer}>
                  <div
                    className={styles.profilePicture}
                    onClick={handleProfilePictureClick}
                  >
                    {previewImage ? (
                      // Use img tag instead of Next.js Image component for data URIs
                      <img
                        key={previewImage} // Add key to force re-render when src changes
                        src={previewImage}
                        alt={name || 'User'}
                        width={150}
                        height={150}
                        className={styles.userAvatar}
                      />
                    ) : (
                      <div className={styles.defaultAvatar}>
                        {(name || user.email || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className={styles.pictureOverlay}>
                      <span>Change</span>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className={styles.fileInput}
                  />

                  <div className={styles.pictureActions}>
                    <button
                      type="button"
                      onClick={handleUpdateProfilePicture}
                      className={styles.pictureButton}
                      disabled={isLoading || !previewImage || previewImage === profilePicture}
                    >
                      {isLoading ? 'Saving...' : 'Save Picture'}
                    </button>

                    {profilePicture && (
                      <button
                        type="button"
                        onClick={handleRemoveProfilePicture}
                        className={styles.removeButton}
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <form className={styles.profileForm} onSubmit={handleUpdateProfile}>
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
