/**
 * Note Grouping Utilities
 * 
 * Provides iPhone Notes-style grouping functionality for organizing notes
 * by time periods: Today, Past 7 Days, Past 30 Days, and Monthly Groups.
 */

/**
 * Groups notes by time periods similar to iPhone Notes app
 * @param {Array} notes - Array of note objects with createdAt timestamps
 * @returns {Object} Grouped notes object with time-based keys
 */
export const groupNotesByTimePeriods = (notes) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const groups = {
    'Today': [],
    'Past 7 Days': [],
    'Past 30 Days': [],
    // Monthly groups will be added dynamically
  };

  notes.forEach(note => {
    const noteDate = new Date(note.createdAt);
    const noteDateOnly = new Date(noteDate.getFullYear(), noteDate.getMonth(), noteDate.getDate());

    if (noteDateOnly.getTime() === today.getTime()) {
      // Notes created today
      groups['Today'].push(note);
    } else if (noteDate >= sevenDaysAgo) {
      // Notes created in the last 7 days but not today
      groups['Past 7 Days'].push(note);
    } else if (noteDate >= thirtyDaysAgo) {
      // Notes created in the last 30 days but not in the last 7 days
      groups['Past 30 Days'].push(note);
    } else {
      // Notes older than 30 days - group by month and year
      const monthYear = noteDate.toLocaleString('default', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(note);
    }
  });

  // Sort notes within each group by most recent first and remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) {
      delete groups[key];
    } else {
      // Sort notes within each group by creation date (most recent first)
      groups[key].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  });

  return groups;
};

/**
 * Groups notes by specific dates within a time period
 * @param {Array} notes - Array of note objects
 * @returns {Object} Notes grouped by specific dates, sorted by most recent date first
 */
export const groupNotesByDate = (notes) => {
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

  // Sort notes within each date group by most recent first
  Object.keys(grouped).forEach(dateKey => {
    grouped[dateKey].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  // Convert to array, sort by date (most recent first), then back to object
  const sortedEntries = Object.entries(grouped).sort(([dateA], [dateB]) => {
    return new Date(dateB) - new Date(dateA);
  });

  const sortedGrouped = {};
  sortedEntries.forEach(([date, notes]) => {
    sortedGrouped[date] = notes;
  });

  return sortedGrouped;
};

/**
 * Formats time for display in notes
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time string
 */
export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Formats date and time for notes not from today
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date and time string
 */
export const formatDateAndTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }) + ' ' + formatTime(dateString);
};

/**
 * Gets the order priority for time groups (for consistent sorting)
 * @param {string} groupName - Name of the time group
 * @returns {number} Priority number (lower = higher priority)
 */
export const getGroupPriority = (groupName) => {
  const priorities = {
    'Today': 1,
    'Past 7 Days': 2,
    'Past 30 Days': 3,
  };

  // Monthly groups get priority based on year and month (most recent first)
  if (!priorities[groupName]) {
    try {
      const date = new Date(groupName + ' 1'); // Add day to make it a valid date
      if (isNaN(date.getTime())) {
        return 9999; // Invalid dates go to the end
      }
      // Higher numbers for more recent dates, but offset to come after the fixed groups
      return 1000 + (date.getFullYear() * 12 + date.getMonth());
    } catch (error) {
      return 9999; // Error handling - put at the end
    }
  }

  return priorities[groupName];
};

/**
 * Sorts grouped notes by priority (Today first, then Past 7 Days, etc.)
 * Most recent content appears first in each category
 * @param {Object} groupedNotes - Object with grouped notes
 * @returns {Array} Array of [groupName, notes] pairs sorted by priority
 */
export const sortGroupsByPriority = (groupedNotes) => {
  return Object.entries(groupedNotes).sort(([groupA], [groupB]) => {
    const priorityA = getGroupPriority(groupA);
    const priorityB = getGroupPriority(groupB);

    // For the main time groups (Today, Past 7 Days, Past 30 Days)
    if (priorityA < 1000 && priorityB < 1000) {
      return priorityA - priorityB;
    }

    // For monthly groups, sort by most recent first
    if (priorityA >= 1000 && priorityB >= 1000) {
      return priorityB - priorityA; // Reverse order for monthly groups (most recent first)
    }

    // Mixed case: time groups always come before monthly groups
    return priorityA < 1000 ? -1 : 1;
  });
};
