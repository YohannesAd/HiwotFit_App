# iPhone-Style Notes Organization

## Overview

The HiwotFit App now features an iPhone Notes-style organization system that automatically groups notes into time-based categories for better organization and easier access to recent content.

## Grouping Structure

### 1. **Today**

- Contains all notes created on the current date
- Shows only the time (e.g., "2:30 PM") since the date is implied
- Highest priority group, always appears first
- **Notes sorted by most recent first within the group**

### 2. **Past 7 Days**

- Contains notes created in the last 7 days (excluding today)
- Shows abbreviated date and time (e.g., "Mon, Jan 1 2:30 PM")
- Second priority group
- **Notes sorted by most recent first within the group**

### 3. **Past 30 Days**

- Contains notes created in the last 30 days (excluding the past 7 days)
- Shows abbreviated date and time (e.g., "Fri, Dec 15 10:45 AM")
- Third priority group
- **Notes sorted by most recent first within the group**

### 4. **Monthly Groups**

- Contains notes older than 30 days
- Grouped by month and year (e.g., "December 2024", "November 2024")
- **Most recent months appear first** (December 2024 before November 2024)
- Within each month, notes are further organized by specific dates
- **Most recent dates appear first within each month**
- **Notes sorted by most recent first within each date**

## Technical Implementation

### Core Functions

#### `groupNotesByTimePeriods(notes)`

```javascript
// Takes an array of notes and returns grouped object
const groupedNotes = groupNotesByTimePeriods(notes);
// Returns: { "Today": [...], "Past 7 Days": [...], "December 2024": [...] }
```

#### `sortGroupsByPriority(groupedNotes)`

```javascript
// Sorts groups by priority (Today first, then chronologically)
const sortedGroups = sortGroupsByPriority(groupedNotes);
// Returns: [["Today", notes], ["Past 7 Days", notes], ...]
```

### Date Calculations

- **Today**: Exact date match (year, month, day)
- **Past 7 Days**: `noteDate >= (today - 7 days) && noteDate < today`
- **Past 30 Days**: `noteDate >= (today - 30 days) && noteDate < (today - 7 days)`
- **Monthly**: `noteDate < (today - 30 days)`

### Date Structure Example:

```
📁 My Notes
├── 📅 Today (3 notes) [Most recent first]
│   ├── 📝 Meeting Notes (2:30 PM) ← Most recent
│   ├── 📝 Lunch Ideas (1:15 PM)
│   └── 📝 Grocery List (10:15 AM) ← Oldest today
├── 📅 Past 7 Days (2 notes) [Most recent first]
│   ├── 📝 Weekend Plans (Mon, Jan 1 3:45 PM) ← More recent
│   └── 📝 Book List (Fri, Dec 29 11:20 AM) ← Older
├── 📅 Past 30 Days (1 note) [Most recent first]
│   └── 📝 Travel Plans (Thu, Dec 15 9:30 AM)
├── 📅 December 2024 (5 notes) [Most recent month first]
│   ├── 🗓️ Monday, December 11, 2024 (2 notes) ← More recent date
│   │   ├── 📝 Project Update (4:00 PM) ← Most recent
│   │   └── 📝 Team Meeting (9:00 AM) ← Older
│   └── 🗓️ Sunday, December 10, 2024 (3 notes) ← Older date
│       ├── 📝 Weekend Summary (8:00 PM) ← Most recent
│       ├── 📝 Shopping List (2:00 PM)
│       └── 📝 Morning Notes (7:00 AM) ← Oldest
└── 📅 November 2024 (3 notes) [Older month]
    └── 🗓️ Friday, November 29, 2024 (3 notes)
        ├── 📝 Holiday Plans (6:00 PM) ← Most recent
        ├── 📝 Recipe Ideas (3:00 PM)
        └── 📝 Work Notes (9:00 AM) ← Oldest
```

## User Interface Features

### Group Display

- Each group shows the number of notes in parentheses
- Empty groups are automatically hidden
- Groups are collapsible/expandable for better navigation

### Time Formatting

- **Today**: "2:30 PM"
- **Recent**: "Mon, Jan 1 2:30 PM"
- **Monthly**: Full date with expandable daily sections

### Visual Indicators

- 📎 File attachment indicator
- 🖼️ Rich media content indicator
- Expandable arrows for date sections

## Benefits

### User Experience

1. **Quick Access**: Recent notes are immediately visible
2. **Logical Organization**: Time-based grouping matches mental models
3. **Reduced Clutter**: Older notes are organized but not overwhelming
4. **Familiar Interface**: Matches iPhone Notes app behavior

### Performance

1. **Efficient Grouping**: O(n) time complexity for grouping
2. **Lazy Loading**: Only expanded sections load detailed views
3. **Memory Efficient**: Groups are created on-demand

## Usage Examples

### Creating Notes

```javascript
// Notes are automatically timestamped and grouped
const newNote = {
  title: "Meeting Notes",
  content: "Important discussion points...",
  createdAt: new Date().toISOString(), // Automatically grouped into "Today"
};
```

### Displaying Groups

```javascript
const groupedNotes = groupNotesByTimePeriods(allNotes);
const sortedGroups = sortGroupsByPriority(groupedNotes);

sortedGroups.forEach(([groupName, notes]) => {
  console.log(`${groupName}: ${notes.length} notes`);
});
```

## Migration from Previous System

### Before (Old System)

- "Last 7 Days" (all recent notes together)
- "By Month" (all older notes by month)
- Less granular time organization

### After (iPhone Style)

- "Today" (current day only)
- "Past 7 Days" (excluding today)
- "Past 30 Days" (excluding past 7 days)
- Monthly groups (older than 30 days)

### Backward Compatibility

- All existing notes work with the new system
- No data migration required
- Timestamps are preserved and re-grouped automatically

## File Structure

```
src/
├── utils/
│   ├── noteGrouping.js          # Core grouping utilities
│   └── noteGrouping.test.js     # Test demonstrations
├── app/
│   └── notes/
│       └── page.js              # Updated notes page with new grouping
└── docs/
    └── notes-organization.md    # This documentation
```

## Future Enhancements

### Potential Features

1. **Custom Time Ranges**: User-defined grouping periods
2. **Search Within Groups**: Filter notes within specific time periods
3. **Group Statistics**: Show creation patterns and usage analytics
4. **Export by Group**: Export notes from specific time periods

### Performance Optimizations

1. **Virtual Scrolling**: For large note collections
2. **Incremental Loading**: Load groups as needed
3. **Caching**: Cache grouped results for better performance

## Testing

Run the test file to see the grouping in action:

```bash
node src/utils/noteGrouping.test.js
```

This will demonstrate how sample notes are automatically organized into the appropriate time-based groups.
