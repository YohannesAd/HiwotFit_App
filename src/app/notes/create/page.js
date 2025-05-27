'use client';

/**
 * Create Note Page
 *
 * This page allows users to create new notes with a title and content.
 * Features a clean editor interface with a "Done" button to save.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import styles from '@/app/styles/CreateNote.module.css';

const CreateNotePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Please provide both a title and content for your note.');
      return;
    }

    if (title.length > 200) {
      setError('Title cannot exceed 200 characters.');
      return;
    }

    if (content.length > 10000) {
      setError('Content cannot exceed 10,000 characters.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create note');
      }

      // Redirect to notes list on success
      router.push('/notes');
    } catch (err) {
      console.error('Error creating note:', err);
      setError(err.message || 'Failed to create note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (title.trim() || content.trim()) {
      if (confirm('You have unsaved changes. Are you sure you want to go back?')) {
        router.push('/notes');
      }
    } else {
      router.push('/notes');
    }
  };

  // Check if form is valid
  const isFormValid = title.trim() && content.trim() && title.length <= 200 && content.length <= 10000;

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Create Note</h1>
            <div className={styles.headerActions}>
              <button
                type="button"
                onClick={handleBack}
                className={styles.backButton}
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                form="note-form"
                className={styles.doneButton}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? 'Saving...' : 'Done'}
              </button>
            </div>
          </div>

          <div className={styles.noteContainer}>
            {error && <div className={styles.error}>{error}</div>}
            
            <form id="note-form" onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="title" className={styles.label}>
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className={styles.titleInput}
                  maxLength={200}
                  disabled={isLoading}
                />
                <div className={`${styles.characterCount} ${title.length > 180 ? styles.warning : ''}`}>
                  {title.length}/200 characters
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="content" className={styles.label}>
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className={styles.contentTextarea}
                  maxLength={10000}
                  disabled={isLoading}
                />
                <div className={`${styles.characterCount} ${content.length > 9500 ? styles.warning : ''}`}>
                  {content.length}/10,000 characters
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CreateNotePage;
