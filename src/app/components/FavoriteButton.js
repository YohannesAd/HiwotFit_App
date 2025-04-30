'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import styles from '@/app/styles/FavoriteButton.module.css';

const FavoriteButton = ({ exercise }) => {
  const { isAuthenticated, user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check if exercise is already in favorites when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      checkFavoriteStatus();
    }
  }, [isAuthenticated]);

  // Function to check if exercise is in favorites
  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        const isInFavorites = data.favorites.some(
          (fav) => fav.exerciseId === exercise.id
        );
        setIsFavorite(isInFavorites);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      setMessage('Please log in to add favorites');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(`/api/favorites/${exercise.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setIsFavorite(false);
          setMessage('Removed from favorites');
        } else {
          const data = await response.json();
          setMessage(data.error || 'Failed to remove from favorites');
        }
      } else {
        // Add to favorites
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            exerciseId: exercise.id,
            title: exercise.title,
            category: exercise.category,
            path: exercise.path,
            embedUrl: exercise.embedUrl,
          }),
        });

        if (response.ok) {
          setIsFavorite(true);
          setMessage('Added to favorites');
        } else {
          const data = await response.json();
          setMessage(data.error || 'Failed to add to favorites');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setMessage('An error occurred');
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className={styles.favoriteContainer}>
      <button
        className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
        onClick={toggleFavorite}
        disabled={isLoading}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '★' : '☆'}
      </button>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default FavoriteButton;
