'use client';

/**
 * Authentication Context
 *
 * This context provides authentication state and functions to the entire app.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create auth context
const AuthContext = createContext();

/**
 * Authentication Provider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Provider-wrapped children
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch current user
  const fetchUser = async () => {
    try {
      console.log('AuthContext - Fetching user...');
      const response = await fetch('/api/auth/user', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      // Check if response is ok and content-type is JSON
      if (!response.ok) {
        console.error('AuthContext - API response not ok:', response.status, response.statusText);
        setUser(null);
        return;
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('AuthContext - Response is not JSON:', contentType);
        setUser(null);
        return;
      }

      const data = await response.json();

      console.log('AuthContext - User data response:', {
        status: response.status,
        hasUser: data.user ? 'yes' : 'no',
        hasPicture: data.user?.profilePicture ? `length: ${data.user.profilePicture.length}` : 'none'
      });

      if (data.user) {
        console.log('AuthContext - Setting user with profile picture:',
          data.user.profilePicture ? `length: ${data.user.profilePicture.length}` : 'none');
        setUser(data.user);
      } else {
        setUser(null);
        console.log('AuthContext - No user found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user on mount, but only in the browser
  useEffect(() => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      fetchUser();
    }
  }, []);

  /**
   * Login function
   * @param {String} email - User email
   * @param {String} password - User password
   * @returns {Promise<Object>} Login result
   */
  const login = async (email, password) => {
    try {
      console.log('AuthContext - Login attempt:', { email });

      // First, ensure we're logged out
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        // Clear user state
        setUser(null);
      } catch (logoutError) {
        console.error('Error during pre-login logout:', logoutError);
      }

      // Now attempt login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-store'
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('AuthContext - Login response is not JSON:', contentType);
        throw new Error('Server error: Invalid response format');
      }

      const data = await response.json();
      console.log('AuthContext - Login response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      console.log('AuthContext - Setting user after login:', data.user);
      setUser(data.user);

      // Fetch user data again to ensure we have the latest
      await fetchUser();

      return { success: true, redirectTo: '/home' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Logout function
   * @returns {Promise<Object>} Logout result
   */
  const logout = async () => {
    try {
      console.log('AuthContext - Logging out user:', user);

      // Immediately clear user state to prevent any race conditions
      setUser(null);
      setLoading(false);

      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      console.log('AuthContext - Logout response:', response.status);

      // Ensure we're on the client side and redirect to landing page
      if (typeof window !== 'undefined') {
        // Clear any cached data
        window.localStorage.clear();
        window.sessionStorage.clear();

        // Force redirect to landing page and clear history
        console.log('AuthContext - Redirecting to landing page after logout');

        // Use window.location.href for a hard redirect to ensure clean state
        window.location.href = '/';
      }

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);

      // Even if API call fails, clear user state and redirect
      setUser(null);
      setLoading(false);

      if (typeof window !== 'undefined') {
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.href = '/';
      }

      return { success: false, error: error.message };
    }
  };

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<Object>} Update result
   */
  const updateProfile = async (profileData) => {
    try {
      console.log('AuthContext - Updating profile with picture:',
        profileData.profilePicture ? `length: ${profileData.profilePicture.length}` : 'none');

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(profileData),
        cache: 'no-store'
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('AuthContext - Profile update response is not JSON:', contentType);
        throw new Error('Server error: Invalid response format');
      }

      const data = await response.json();
      console.log('AuthContext - Profile update response:', {
        status: response.status,
        success: data.message ? true : false,
        hasPicture: data.user?.profilePicture ? `length: ${data.user.profilePicture.length}` : 'none'
      });

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed');
      }

      console.log('AuthContext - Setting user after profile update:', {
        id: data.user.id,
        name: data.user.name,
        hasPicture: data.user.profilePicture ? `length: ${data.user.profilePicture.length}` : 'none'
      });

      setUser(data.user);

      // Fetch user data again to ensure we have the latest
      console.log('AuthContext - Fetching user data after profile update');
      await fetchUser();
      console.log('AuthContext - User data fetched after profile update');

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    fetchUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use the auth context
 * @returns {Object} Auth context value
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    // Return a default context with empty values instead of throwing an error
    return {
      user: null,
      loading: false,
      login: () => Promise.resolve({ success: false, error: 'Not implemented' }),
      logout: () => Promise.resolve({ success: false, error: 'Not implemented' }),
      updateProfile: () => Promise.resolve({ success: false, error: 'Not implemented' }),
      fetchUser: () => Promise.resolve(),
      isAuthenticated: false,
    };
  }

  return context;
}
