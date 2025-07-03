'use client';

/**
 * Notes List Page
 *
 * This page displays all user notes organized by time periods.
 * Shows notes grouped by "Last 7 Days", then by months, then by years.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import {
  groupNotesByTimePeriods,
  groupNotesByDate,
  formatTime,
  formatDateAndTime,
  sortGroupsByPriority
} from '@/utils/noteGrouping';
import styles from '@/app/styles/Notes.module.css';

const NotesPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedDates, setExpandedDates] = useState(new Set());

  // Fetch user's notes
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;

      try {
        const response = await fetch('/api/notes');

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError('Failed to load your notes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  // Handle note deletion
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await fetch(`/api/notes/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setNotes(notes.filter(note => note._id !== id));
        } else {
          throw new Error('Failed to delete note');
        }
      } catch (err) {
        console.error('Error deleting note:', err);
        setError('Failed to delete note');
      }
    }
  };

  // Toggle date group expansion
  const toggleDateExpansion = (dateKey) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(dateKey)) {
      newExpanded.delete(dateKey);
    } else {
      newExpanded.add(dateKey);
    }
    setExpandedDates(newExpanded);
  };



  // Format note preview (strip media placeholders for preview)
  const getPreview = (content) => {
    // Remove media placeholders for clean preview
    const cleanContent = content.replace(/\[(?:IMAGE|VIDEO):[^\]]+\]/g, '[Media]');
    return cleanContent.length > 150 ? cleanContent.substring(0, 150) + '...' : cleanContent;
  };

  // Check if note has embedded media
  const hasEmbeddedMedia = (content) => {
    return /\[(?:IMAGE|VIDEO):[^\]]+\]/.test(content);
  };

  const groupedNotes = groupNotesByTimePeriods(notes);

  return (
    <ProtectedRoute>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.pageContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Notes</h1>
            <button
              onClick={() => router.push('/notes/create')}
              className={styles.createButton}
            >
              Create Note
            </button>
          </div>

          <div className={styles.notesContainer}>
            {isLoading ? (
              <p className={styles.loadingText}>Loading your notes...</p>
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : notes.length === 0 ? (
              <div className={styles.emptyState}>
                <p>You don't have any notes yet.</p>
                <button
                  onClick={() => router.push('/notes/create')}
                  className={styles.createButton}
                >
                  Create Your First Note
                </button>
              </div>
            ) : (
              <>
                {/* Render all time groups in priority order */}
                {sortGroupsByPriority(groupedNotes).map(([groupName, groupNotes]) => (
                  <div key={groupName} className={styles.timeSection}>
                    <h2 className={styles.timeSectionHeader}>{groupName}</h2>

                    {/* For Today, Past 7 Days, and Past 30 Days - show notes directly */}
                    {(['Today', 'Past 7 Days', 'Past 30 Days'].includes(groupName)) ? (
                      <div className={styles.notesList}>
                        {groupNotes.map((note) => (
                          <div key={note._id} className={styles.noteCard}>
                            <div className={styles.noteHeader}>
                              <h3 className={styles.noteTitle}>
                                {note.title}
                                {note.attachments && note.attachments.length > 0 && (
                                  <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#667eea' }}>
                                    📎 {note.attachments.length}
                                  </span>
                                )}
                                {hasEmbeddedMedia(note.content) && (
                                  <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#10ac84' }}>
                                    🖼️ Rich
                                  </span>
                                )}
                              </h3>
                              <span className={styles.noteTime}>
                                {groupName === 'Today'
                                  ? formatTime(note.createdAt)
                                  : formatDateAndTime(note.createdAt)
                                }
                              </span>
                            </div>
                            <p className={styles.notePreview}>{getPreview(note.content)}</p>
                            <div className={styles.noteActions}>
                              <button
                                onClick={() => router.push(`/notes/${note._id}`)}
                                className={styles.editButton}
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleDelete(note._id)}
                                className={styles.deleteButton}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* For monthly groups - group by specific dates within the month */
                      <>
                        {Object.entries(groupNotesByDate(groupNotes)).map(([date, dateNotes]) => (
                          <div key={date} className={styles.dateGroup}>
                            <div
                              className={styles.dateHeader}
                              onClick={() => toggleDateExpansion(`${groupName}-${date}`)}
                            >
                              <span className={`${styles.expandIcon} ${expandedDates.has(`${groupName}-${date}`) ? styles.expanded : ''}`}>
                                ▶
                              </span>
                              {date} ({dateNotes.length})
                            </div>
                            {expandedDates.has(`${groupName}-${date}`) && (
                              <div className={styles.notesList}>
                                {dateNotes.map((note) => (
                                  <div key={note._id} className={styles.noteCard}>
                                    <div className={styles.noteHeader}>
                                      <h3 className={styles.noteTitle}>
                                        {note.title}
                                        {note.attachments && note.attachments.length > 0 && (
                                          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#667eea' }}>
                                            📎 {note.attachments.length}
                                          </span>
                                        )}
                                        {hasEmbeddedMedia(note.content) && (
                                          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#10ac84' }}>
                                            🖼️ Rich
                                          </span>
                                        )}
                                      </h3>
                                      <span className={styles.noteTime}>{formatTime(note.createdAt)}</span>
                                    </div>
                                    <p className={styles.notePreview}>{getPreview(note.content)}</p>
                                    <div className={styles.noteActions}>
                                      <button
                                        onClick={() => router.push(`/notes/${note._id}`)}
                                        className={styles.editButton}
                                      >
                                        View
                                      </button>
                                      <button
                                        onClick={() => handleDelete(note._id)}
                                        className={styles.deleteButton}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default NotesPage;
