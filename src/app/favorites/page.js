'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Favorites.module.css';

const FavoritesPage = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login?callbackUrl=/favorites');
    }
  }, [isAuthenticated, loading, router]);

  // Fetch favorites when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  // Function to fetch favorites
  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch favorites');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('An error occurred while fetching favorites');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to remove a favorite
  const removeFavorite = async (id) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update favorites list
        setFavorites(favorites.filter(fav => fav.exerciseId !== id));

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('favoriteUpdate'));
        console.log('FavoritesPage - Dispatched favoriteUpdate event (removed)');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      setError('An error occurred while removing favorite');
    }
  };

  // Group favorites by category
  const groupedFavorites = favorites.reduce((acc, favorite) => {
    const category = favorite.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(favorite);
    return acc;
  }, {});

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.pageContent}>
        <h1 className={styles.title}>My Favorite Exercises</h1>

        {isLoading ? (
          <div className={styles.loadingText}>Loading favorites...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <p>You haven&apos;t added any favorite exercises yet.</p>
            <Link href="/features/workout/list_of_muscle" className={styles.browseLink}>
              Browse Exercises
            </Link>
          </div>
        ) : (
          Object.entries(groupedFavorites).map(([category, categoryFavorites]) => (
            <div key={category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <div className={styles.grid}>
                {categoryFavorites.map((favorite) => (
                  <div key={favorite.exerciseId} className={styles.card}>
                    <Link href={favorite.path}>
                      <div className={styles.videoWrapper}>
                        <iframe
                          src={favorite.embedUrl}
                          title={favorite.title}
                          width="100%"
                          height="200"
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                        <div className={styles.clickOverlay}></div>
                      </div>
                      <p className={styles.label}>{favorite.title}</p>
                    </Link>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeFavorite(favorite.exerciseId)}
                      aria-label={`Remove ${favorite.title} from favorites`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
