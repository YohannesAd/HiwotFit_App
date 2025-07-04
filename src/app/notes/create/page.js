'use client';

/**
 * Create Note Page
 *
 * This page allows users to create new notes with a title and content.
 * Features a clean editor interface with a "Done" button to save.
 */

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import RichTextEditor from '@/app/components/RichTextEditor';
import styles from '@/app/styles/CreateNote.module.css';

const CreateNotePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if content is valid - handle rich content properly
  const hasValidContent = (contentToCheck = content) => {
    if (!contentToCheck) return false;

    // Check if content has text or media
    const hasText = contentToCheck.replace(/\[(?:IMAGE|VIDEO):[^\]]+\]/g, '').trim().length > 0;
    const hasMedia = /\[(?:IMAGE|VIDEO):[^\]]+\]/.test(contentToCheck);

    return hasText || hasMedia;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !hasValidContent(content)) {
      setError('Please provide both a title and content for your note.');
      return;
    }

    if (title.length > 200) {
      setError('Title cannot exceed 200 characters.');
      return;
    }

    if (content.length > 50000) {
      setError('Content cannot exceed 50,000 characters.');
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
          content: content, // Don't trim content as it may contain media placeholders
          attachments: attachments,
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setError('');

    files.forEach(file => {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }

      // Check if file already exists
      if (attachments.some(att => att.fileName === file.name)) {
        setError(`File "${file.name}" is already attached.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newAttachment = {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileData: reader.result,
        };

        setAttachments(prev => [...prev, newAttachment]);
      };

      reader.onerror = () => {
        setError(`Failed to read file "${file.name}". Please try again.`);
      };

      reader.readAsDataURL(file);
    });

    // Clear the input
    e.target.value = '';
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
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

  // Handle back navigation
  const handleBack = () => {
    if (title.trim() || content.trim() || attachments.length > 0) {
      if (confirm('You have unsaved changes. Are you sure you want to go back?')) {
        router.push('/notes');
      }
    } else {
      router.push('/notes');
    }
  };

  // Check if form is valid - use useMemo to ensure proper recalculation
  const isFormValid = useMemo(() => {
    return title.trim() &&
           hasValidContent(content) &&
           title.length <= 200 &&
           content.length <= 50000;
  }, [title, content, hasValidContent]);

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
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your note... Use the toolbar to add images and videos!"
                  disabled={isLoading}
                  maxLength={50000}
                />
              </div>

              {/* File Upload Section */}
              <div className={styles.fileUploadSection}>
                <label htmlFor="file-upload" className={styles.fileUploadButton}>
                  <span className={styles.uploadIcon}>📎</span>
                  Attach Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className={styles.fileInput}
                  disabled={isLoading}
                />
                <p className={styles.uploadHint}>
                  You can attach images, documents, and other files (max 10MB each)
                </p>

                {/* Attachments List */}
                {attachments.length > 0 && (
                  <div className={styles.attachmentsList}>
                    {attachments.map((attachment, index) => (
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
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className={styles.removeAttachmentButton}
                          disabled={isLoading}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
