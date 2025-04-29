/**
 * JWT Authentication Utilities
 *
 * This file provides functions for JWT token generation and verification.
 */

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// JWT secret key - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object to encode in the token
 * @returns {String} JWT token
 */
export function generateToken(user) {
  // Create a user object without sensitive information
  const tokenUser = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username,
  };

  // Generate token that expires in 30 days
  return jwt.sign(tokenUser, JWT_SECRET, { expiresIn: '30d' });
}

/**
 * Verify a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * Set authentication token in cookies
 * @param {String} token - JWT token to set
 */
export async function setAuthCookie(token) {
  (await cookies()).set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

/**
 * Get authentication token from cookies
 * @returns {Promise<String|null>} JWT token or null if not found
 */
export async function getAuthCookie() {
  return (await cookies()).get('auth_token')?.value || null;
}

/**
 * Remove authentication token from cookies
 */
export async function removeAuthCookie() {
  (await cookies()).delete('auth_token');
}

/**
 * Get current user from token in cookies
 * @returns {Promise<Object|null>} User object or null if not authenticated
 */
export async function getCurrentUser() {
  const token = await getAuthCookie();
  if (!token) return null;

  return verifyToken(token);
}
