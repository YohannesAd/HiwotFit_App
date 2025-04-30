/**
 * Authentication Utilities
 *
 * This file provides functions for authentication verification.
 */

import { getCurrentUser } from './jwt';

/**
 * Verify if the current request is authenticated
 * @returns {Promise<Object>} Authentication result with isAuthenticated and userId
 */
export async function verifyAuth() {
  try {
    // Get current user from JWT token
    const user = await getCurrentUser();
    
    if (!user) {
      return { isAuthenticated: false };
    }
    
    return {
      isAuthenticated: true,
      userId: user.id,
      user
    };
  } catch (error) {
    console.error('Authentication verification error:', error);
    return { isAuthenticated: false };
  }
}
