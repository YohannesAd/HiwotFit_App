/**
 * Utility functions for formatting data
 */

/**
 * Format height based on the unit
 * @param {number} height - The height value
 * @param {string} unit - The unit of measurement (cm, inch, ft/in)
 * @returns {string} Formatted height string
 */
export function formatHeight(height, unit) {
  if (!height) return '';
  
  // If the unit is cm, just return the value with the unit
  if (unit === 'cm') {
    return `${height} cm`;
  }
  
  // If the unit is inch, convert to feet and inches format
  if (unit === 'inch') {
    const feet = Math.floor(height / 12);
    const inches = Math.round(height % 12);
    
    // Handle the case where inches is 12 (should be 1 foot, 0 inches)
    if (inches === 12) {
      return `${feet + 1}'0"`;
    }
    
    return `${feet}'${inches}"`;
  }
  
  // If the unit is already ft/in (this shouldn't happen in current implementation)
  if (unit === 'ft/in') {
    return height; // Assuming height is already formatted as "5'11"" or similar
  }
  
  // Default fallback
  return `${height} ${unit}`;
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get activity level description based on selected value
 * @param {string} activity - Activity level code
 * @returns {string} Activity level description
 */
export function getActivityDescription(activity) {
  switch(activity) {
    case 'sedentary': 
      return 'Little or no exercise, desk job';
    case 'light': 
      return 'Light exercise or sports 1-3 days/week';
    case 'moderate': 
      return 'Moderate exercise or sports 3-5 days/week';
    case 'very_active': 
      return 'Hard exercise or sports 6-7 days/week';
    case 'extremely_active': 
      return 'Hard daily exercise or sports and physical job or twice daily training';
    default: 
      return activity || '';
  }
}

/**
 * Get goal description
 * @param {string} goal - Goal code
 * @returns {string} Goal description
 */
export function getGoalDescription(goal) {
  switch(goal) {
    case 'cut': 
      return 'Weight Loss';
    case 'bulk': 
      return 'Weight Gain';
    case 'maintain': 
      return 'Maintenance';
    default: 
      return goal || '';
  }
}
