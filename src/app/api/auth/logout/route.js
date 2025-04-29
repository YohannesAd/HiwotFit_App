/**
 * Logout API Route
 *
 * This API route handles user logout by removing the auth token cookie.
 */

import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth/jwt';

/**
 * POST handler for user logout
 * @returns {NextResponse} - The API response
 */
export async function POST() {
  try {
    console.log('Logout API - Removing auth cookie');

    // Remove auth token cookie
    await removeAuthCookie();

    // Create response with no-cache headers
    const response = NextResponse.json({ message: 'Logout successful' });

    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    // Explicitly clear the auth cookie in the response
    response.cookies.delete('auth_token');

    console.log('Logout API - Response prepared with headers:',
      Object.fromEntries(response.headers.entries()));

    return response;
  } catch (error) {
    console.error('Logout error:', error);

    // Return error response
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        }
      }
    );
  }
}
