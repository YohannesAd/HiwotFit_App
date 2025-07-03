/**
 * Test file to demonstrate iPhone Notes-style grouping functionality
 * 
 * This file shows how the groupNotesByTimePeriods function works with sample data.
 * Run this with: node src/utils/noteGrouping.test.js
 */

import { groupNotesByTimePeriods, sortGroupsByPriority } from './noteGrouping.js';

// Sample notes data for testing
const sampleNotes = [
  // Today's notes
  {
    _id: '1',
    title: 'Today\'s Meeting Notes',
    content: 'Important meeting with the team about project updates.',
    createdAt: new Date().toISOString(), // Today
  },
  {
    _id: '2',
    title: 'Grocery List',
    content: 'Milk, Bread, Eggs, Apples',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  
  // Past 7 days notes
  {
    _id: '3',
    title: 'Weekend Plans',
    content: 'Visit the park, movie night, dinner with friends',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    _id: '4',
    title: 'Book Recommendations',
    content: 'The Pragmatic Programmer, Clean Code, Design Patterns',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  
  // Past 30 days notes
  {
    _id: '5',
    title: 'Travel Itinerary',
    content: 'Flight details, hotel bookings, places to visit',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
  {
    _id: '6',
    title: 'Recipe Collection',
    content: 'Pasta recipes, dessert ideas, healthy snacks',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
  },
  
  // Monthly groups (older than 30 days) - testing multiple months
  {
    _id: '7',
    title: 'Recent Project Ideas',
    content: 'Mobile app concepts, web development projects',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
  },
  {
    _id: '8',
    title: 'Learning Goals',
    content: 'JavaScript frameworks, database design, UI/UX principles',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
  },
  {
    _id: '9',
    title: 'Older Project Ideas',
    content: 'Some older project concepts',
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), // 75 days ago
  },
  {
    _id: '10',
    title: 'Very Old Note',
    content: 'This is a very old note from last year',
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
  },
  {
    _id: '11',
    title: 'Another Recent Monthly Note',
    content: 'Another note from recent month',
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), // 50 days ago
  },
];

// Test the grouping function
console.log('🧪 Testing iPhone Notes-style grouping...\n');

const groupedNotes = groupNotesByTimePeriods(sampleNotes);
const sortedGroups = sortGroupsByPriority(groupedNotes);

console.log('📊 Grouped Notes Results:');
console.log('========================\n');

sortedGroups.forEach(([groupName, notes]) => {
  console.log(`📁 ${groupName} (${notes.length} notes):`);
  notes.forEach(note => {
    const date = new Date(note.createdAt);
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    console.log(`  📝 "${note.title}" - ${dateStr} ${timeStr}`);
  });
  console.log('');
});

console.log('✅ Grouping test completed!');
console.log('\n📋 Summary:');
console.log(`- Total notes processed: ${sampleNotes.length}`);
console.log(`- Number of groups created: ${Object.keys(groupedNotes).length}`);
console.log(`- Groups in order: ${sortedGroups.map(([name]) => name).join(' → ')}`);

// Test sorting order
console.log('\n🔄 Testing Sort Order:');
console.log('===================');
console.log('Groups should appear in this order:');
console.log('1. Today (most recent first within group)');
console.log('2. Past 7 Days (most recent first within group)');
console.log('3. Past 30 Days (most recent first within group)');
console.log('4. Monthly groups (most recent months first, most recent notes first within each month)');

console.log('\nActual order:');
sortedGroups.forEach(([groupName], index) => {
  console.log(`${index + 1}. ${groupName}`);
});

// Test edge cases
console.log('\n🔍 Testing edge cases...');

// Test with empty array
const emptyResult = groupNotesByTimePeriods([]);
console.log(`Empty array test: ${Object.keys(emptyResult).length === 0 ? '✅ PASS' : '❌ FAIL'}`);

// Test with single note
const singleNoteResult = groupNotesByTimePeriods([sampleNotes[0]]);
console.log(`Single note test: ${Object.keys(singleNoteResult).includes('Today') ? '✅ PASS' : '❌ FAIL'}`);

console.log('\n🎉 All tests completed!');
