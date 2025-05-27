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

  // Group notes by time periods
  const groupNotesByTime = (notes) => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const groups = {
      lastSevenDays: [],
      byMonth: {},
      byYear: {}
    };

    notes.forEach(note => {
      const noteDate = new Date(note.createdAt);
      
      if (noteDate >= sevenDaysAgo) {
        groups.lastSevenDays.push(note);
      } else {
        const year = noteDate.getFullYear();
        const month = noteDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        if (!groups.byMonth[month]) {
          groups.byMonth[month] = [];
        }
        groups.byMonth[month].push(note);
      }
    });

    return groups;
  };

  // Group notes by specific dates within a time period
  const groupNotesByDate = (notes) => {
    const grouped = {};
    
    notes.forEach(note => {
      const noteDate = new Date(note.createdAt);
      const dateKey = noteDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(note);
    });

    return grouped;
  };

  // Format note preview
  const getPreview = (content) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const groupedNotes = groupNotesByTime(notes);

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
                {/* Last 7 Days */}
                {groupedNotes.lastSevenDays.length > 0 && (
                  <div className={styles.timeSection}>
                    <h2 className={styles.timeSectionHeader}>Last 7 Days</h2>
                    {Object.entries(groupNotesByDate(groupedNotes.lastSevenDays)).map(([date, dateNotes]) => (
                      <div key={date} className={styles.dateGroup}>
                        <div 
                          className={styles.dateHeader}
                          onClick={() => toggleDateExpansion(date)}
                        >
                          <span className={`${styles.expandIcon} ${expandedDates.has(date) ? styles.expanded : ''}`}>
                            ▶
                          </span>
                          {date} ({dateNotes.length})
                        </div>
                        {expandedDates.has(date) && (
                          <div className={styles.notesList}>
                            {dateNotes.map((note) => (
                              <div key={note._id} className={styles.noteCard}>
                                <div className={styles.noteHeader}>
                                  <h3 className={styles.noteTitle}>{note.title}</h3>
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
                  </div>
                )}

                {/* By Month */}
                {Object.keys(groupedNotes.byMonth).length > 0 && (
                  <div className={styles.timeSection}>
                    <h2 className={styles.timeSectionHeader}>By Month</h2>
                    {Object.entries(groupedNotes.byMonth).map(([month, monthNotes]) => (
                      <div key={month} className={styles.dateGroup}>
                        <div 
                          className={styles.dateHeader}
                          onClick={() => toggleDateExpansion(month)}
                        >
                          <span className={`${styles.expandIcon} ${expandedDates.has(month) ? styles.expanded : ''}`}>
                            ▶
                          </span>
                          {month} ({monthNotes.length})
                        </div>
                        {expandedDates.has(month) && (
                          <>
                            {Object.entries(groupNotesByDate(monthNotes)).map(([date, dateNotes]) => (
                              <div key={date} className={styles.dateGroup} style={{ marginLeft: '1rem' }}>
                                <div 
                                  className={styles.dateHeader}
                                  onClick={() => toggleDateExpansion(`${month}-${date}`)}
                                >
                                  <span className={`${styles.expandIcon} ${expandedDates.has(`${month}-${date}`) ? styles.expanded : ''}`}>
                                    ▶
                                  </span>
                                  {date} ({dateNotes.length})
                                </div>
                                {expandedDates.has(`${month}-${date}`) && (
                                  <div className={styles.notesList}>
                                    {dateNotes.map((note) => (
                                      <div key={note._id} className={styles.noteCard}>
                                        <div className={styles.noteHeader}>
                                          <h3 className={styles.noteTitle}>{note.title}</h3>
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
                  </div>
                )}
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
