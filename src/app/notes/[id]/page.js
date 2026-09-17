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
import RichTextEditor from '@/app/components/RichTextEditor';
import { getNoteContentError } from '@/utils/noteContent';
import RichContentViewer from '@/app/components/RichContentViewer';
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
  const [editAttachments, setEditAttachments] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isReadingImages, setIsReadingImages] = useState(false);

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
        setEditAttachments(data.attachments || []);
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
    setEditAttachments(note.attachments || []);
    setError('');
  };

  // Handle save changes
  const handleSave = async (e) => {
    e.preventDefault();

    if (!editTitle.trim() || !!getNoteContentError(editContent)) {
      setError(!editTitle.trim() ? 'Please provide a title for your note.' : getNoteContentError(editContent));
      return;
    }

    if (editTitle.length > 200) {
      setError('Title cannot exceed 200 characters.');
      return;
    }

    if (isReadingImages) return;

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
          content: editContent, // Don't trim content as it may contain media placeholders
          attachments: editAttachments,
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

  // Remove attachment
  const removeAttachment = (index) => {
    setEditAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Download attachment
  const downloadAttachment = (attachment) => {
    const link = document.createElement('a');
    link.href = attachment.fileData;
    link.download = attachment.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return '🖼️';
    } else if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return '📝';
    } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return '📊';
    } else if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
      return '📋';
    } else if (fileType.startsWith('video/')) {
      return '🎥';
    } else if (fileType.startsWith('audio/')) {
      return '🎵';
    } else {
      return '📎';
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

  const isFormValid = editTitle.trim() && editTitle.length <= 200 && !getNoteContentError(editContent);

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
                disabled={isSaving || isReadingImages}
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
                    disabled={isSaving || isReadingImages}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="edit-form"
                    className={styles.saveButton}
                    disabled={!isFormValid || isSaving || isReadingImages}
                  >
                    {isSaving ? 'Saving...' : isReadingImages ? 'Adding pictures...' : 'Save'}
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
                  <RichContentViewer content={note.content} />
                </div>

                {/* Attachments in View Mode */}
                {note.attachments && note.attachments.length > 0 && (
                  <div className={styles.attachmentsList}>
                    <h3 style={{ marginBottom: '1rem', color: '#333', fontFamily: 'var(--font-montserrat)' }}>
                      Attachments ({note.attachments.length})
                    </h3>
                    {note.attachments.map((attachment, index) => (
                      <div key={index} className={`${styles.attachmentItem} ${styles.clickable}`}>
                        {attachment.fileType.startsWith('image/') && (
                          <img src={attachment.fileData} alt={attachment.fileName} style={{ maxWidth: '50%', maxHeight: 240, objectFit: 'contain' }} />
                        )}
                        <div className={styles.attachmentInfo} onClick={() => downloadAttachment(attachment)}>
                          <span className={styles.attachmentIcon}>
                            {getFileIcon(attachment.fileType)}
                          </span>
                          <div className={styles.attachmentDetails}>
                            <p className={styles.attachmentName}>{attachment.fileName}</p>
                            <p className={styles.attachmentSize}>{formatFileSize(attachment.fileSize)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadAttachment(attachment)}
                          className={styles.downloadButton}
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                    disabled={isSaving || isReadingImages}
                  />
                  <div className={`${styles.characterCount} ${editTitle.length > 180 ? styles.warning : ''}`}>
                    {editTitle.length}/200 characters
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="edit-content" className={styles.label}>
                    Content
                  </label>
                  <RichTextEditor
                    content={editContent}
                    onChange={setEditContent}
                    onBusyChange={setIsReadingImages}
                    placeholder="Edit your note content... Use Image to add pictures!"
                    disabled={isSaving || isReadingImages}
                    maxLength={50000}
                  />
                </div>

                {/* Preserve access to attachments on older notes. */}
                {editAttachments.length > 0 && <div className={styles.fileUploadSection}>
                  {/* Attachments List in Edit Mode */}
                  {editAttachments.length > 0 && (
                    <div className={styles.attachmentsList}>
                      {editAttachments.map((attachment, index) => (
                        <div key={index} className={styles.attachmentItem}>
                          <div className={styles.attachmentInfo}>
                            <span className={styles.attachmentIcon}>
                              {getFileIcon(attachment.fileType)}
                            </span>
                            <div className={styles.attachmentDetails}>
                              <p className={styles.attachmentName}>{attachment.fileName}</p>
                              <p className={styles.attachmentSize}>{formatFileSize(attachment.fileSize)}</p>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => downloadAttachment(attachment)}
                              className={styles.downloadButton}
                              disabled={isSaving || isReadingImages}
                            >
                              Download
                            </button>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className={styles.removeAttachmentButton}
                              disabled={isSaving || isReadingImages}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>}
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
