'use client';

/**
 * Create Note Page
 *
 * This page allows users to create new notes with a title and content.
 * Features a clean editor interface with a "Done" button to save.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import RichTextEditor from '@/app/components/RichTextEditor';
import { getNoteContentError } from '@/utils/noteContent';
import styles from '@/app/styles/CreateNote.module.css';

const CreateNotePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isReadingImages, setIsReadingImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !!getNoteContentError(content)) {
      setError(!title.trim() ? 'Please provide a title for your note.' : getNoteContentError(content));
      return;
    }

    if (title.length > 200) {
      setError('Title cannot exceed 200 characters.');
      return;
    }

    if (isReadingImages) return;

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
          content: content, // Don't trim content as it may contain media placeholders
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

  const isFormValid = title.trim() && title.length <= 200 && !getNoteContentError(content);

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
                disabled={isLoading || isReadingImages}
              >
                Back
              </button>
              <button
                type="submit"
                form="note-form"
                className={styles.doneButton}
                disabled={!isFormValid || isLoading || isReadingImages}
              >
                {isLoading ? 'Saving...' : isReadingImages ? 'Adding pictures...' : 'Done'}
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
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  onBusyChange={setIsReadingImages}
                  placeholder="Start writing your note... Use Image to add pictures!"
                  disabled={isLoading}
                  maxLength={50000}
                />
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
