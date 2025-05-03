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
  const { user, updateProfile, fetchUser } = useAuth();
  const router = useRouter();

  // State for profile form
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // Update form values when user data is available
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      if (user.profilePicture) {
        setProfilePicture(user.profilePicture);
        setPreviewUrl(user.profilePicture);
      }
    }
  }, [user]);

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    console.log('Profile - Selected file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      console.log('Profile - Preview URL set, length:', reader.result.length);
    };
    reader.readAsDataURL(file);

    // Compress and convert to base64 for storage
    const compressAndConvert = () => {
      // Create a canvas element to resize the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 300px width/height)
        let width = img.width;
        let height = img.height;
        const maxSize = 300;

        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        // Resize image
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with reduced quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        console.log('Profile - Compressed Base64 string length:', compressedBase64.length);
        setProfilePicture(compressedBase64);
      };

      // Load image from file
      img.src = previewUrl;
    };

    // Wait for preview URL to be set before compressing
    setTimeout(compressAndConvert, 100);
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      console.log('Profile - Updating profile with picture length:', profilePicture?.length);

      // Call the updateProfile function from AuthContext
      const result = await updateProfile({
        name,
        username,
        profilePicture
      });

      console.log('Profile - Update result:', result);

      if (result.success) {
        console.log('Profile - Update successful, fetching user data');
        // Force a refresh of the user data
        await fetchUser();
        console.log('Profile - User data refreshed');
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
      console.log('Profile - Save and return with picture length:', profilePicture?.length);

      // Call the updateProfile function from AuthContext
      const result = await updateProfile({
        name,
        username,
        profilePicture
      });

      console.log('Profile - Save and return result:', result);

      if (result.success) {
        console.log('Profile - Save successful, fetching user data');
        // Force a refresh of the user data before redirecting
        await fetchUser();
        console.log('Profile - User data refreshed, redirecting to home');
        // Use router for navigation instead of window.location
        router.push('/home');
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

                <div className={styles.profilePictureSection}>
                  <div className={styles.picturePreview}>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className={styles.previewImage}
                      />
                    ) : (
                      <div className={styles.placeholderInitial}>
                        {name ? name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={styles.pictureUpload}>
                    <label htmlFor="profilePicture" className={styles.uploadButton}>
                      Change Profile Picture
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className={styles.fileInput}
                    />
                    <p className={styles.uploadHint}>
                      JPG, PNG or GIF, max 5MB
                    </p>
                  </div>
                </div>

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
