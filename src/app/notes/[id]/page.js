'use client';

/**
 * View/Edit Note Page
 *
 * This page displays a specific note and allows editing.
 * Users can view the note content and switch to edit mode.
 */

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import styles from '@/app/styles/ViewNote.module.css';

const ViewNotePage = ({ params }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Unwrap params using React.use()
  const resolvedParams = use(params);

  // Fetch note data
  useEffect(() => {
    const fetchNote = async () => {
      if (!user || !resolvedParams.id) return;

      try {
        const response = await fetch(`/api/notes/${resolvedParams.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Note not found');
          }
          throw new Error('Failed to fetch note');
        }

        const data = await response.json();
        setNote(data);
        setEditTitle(data.title);
        setEditContent(data.content);
      } catch (err) {
        console.error('Error fetching note:', err);
        setError(err.message || 'Failed to load note');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [user, resolvedParams.id]);

  // Handle edit mode toggle
  const handleEdit = () => {
    setIsEditing(true);
    setError('');
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(note.title);
    setEditContent(note.content);
    setError('');
  };

  // Handle save changes
  const handleSave = async (e) => {
    e.preventDefault();

    if (!editTitle.trim() || !editContent.trim()) {
      setError('Please provide both a title and content for your note.');
      return;
    }

    if (editTitle.length > 200) {
      setError('Title cannot exceed 200 characters.');
      return;
    }

    if (editContent.length > 10000) {
      setError('Content cannot exceed 10,000 characters.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/notes/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          content: editContent.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update note');
      }

      const updatedNote = await response.json();
      setNote(updatedNote);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating note:', err);
      setError(err.message || 'Failed to update note. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Check if form is valid
  const isFormValid = editTitle.trim() && editContent.trim() &&
                     editTitle.length <= 200 && editContent.length <= 10000;

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className={styles.pageWrapper}>
          <Navbar />
          <main className={styles.pageContent}>
            <div className={styles.noteContainer}>
              <p className={styles.loadingText}>Loading note...</p>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  if (error && !note) {
    return (
      <ProtectedRoute>
        <div className={styles.pageWrapper}>
          <Navbar />
          <main className={styles.pageContent}>
            <div className={styles.noteContainer}>
              <div className={styles.error}>{error}</div>
              <button
                onClick={() => router.push('/notes')}
                className={styles.backButton}
              >
                Back to Notes
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {isEditing ? 'Edit Note' : 'View Note'}
            </h1>
            <div className={styles.headerActions}>
              <button
                onClick={() => router.push('/notes')}
                className={styles.backButton}
                disabled={isSaving}
              >
                Back
              </button>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className={styles.editButton}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className={styles.cancelButton}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="edit-form"
                    className={styles.saveButton}
                    disabled={!isFormValid || isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.noteContainer}>
            {error && <div className={styles.error}>{error}</div>}

            {!isEditing ? (
              // View Mode
              <>
                <div className={styles.noteMetadata}>
                  <h2 className={styles.noteTitle}>{note.title}</h2>
                  <div className={styles.noteDates}>
                    <div>Created: {formatDate(note.createdAt)}</div>
                    {note.updatedAt !== note.createdAt && (
                      <div>Updated: {formatDate(note.updatedAt)}</div>
                    )}
                  </div>
                </div>
                <div className={styles.noteContent}>
                  {note.content}
                </div>
              </>
            ) : (
              // Edit Mode
              <form id="edit-form" onSubmit={handleSave} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="edit-title" className={styles.label}>
                    Title
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className={styles.titleInput}
                    maxLength={200}
                    disabled={isSaving}
                  />
                  <div className={`${styles.characterCount} ${editTitle.length > 180 ? styles.warning : ''}`}>
                    {editTitle.length}/200 characters
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="edit-content" className={styles.label}>
                    Content
                  </label>
                  <textarea
                    id="edit-content"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={styles.contentTextarea}
                    maxLength={10000}
                    disabled={isSaving}
                  />
                  <div className={`${styles.characterCount} ${editContent.length > 9500 ? styles.warning : ''}`}>
                    {editContent.length}/10,000 characters
                  </div>
                </div>
              </form>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ViewNotePage;
