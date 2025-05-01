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

      const data = await response.json();

      console.log('AuthContext - User data:', data);

      if (data.user) {
        setUser(data.user);
        console.log('AuthContext - User set:', data.user);
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

  // Fetch current user on mount
  useEffect(() => {
    fetchUser();
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

      const data = await response.json();
      console.log('AuthContext - Login response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      console.log('AuthContext - Setting user after login:', data.user);
      setUser(data.user);

      // Fetch user data again to ensure we have the latest
      await fetchUser();

      return { success: true };
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

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      console.log('AuthContext - Logout response:', response.status);

      // Force clear user state
      setUser(null);

      // Force reload the page to clear any cached state
      window.location.href = '/';

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
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
      console.log('AuthContext - Updating profile:', profileData);

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

      const data = await response.json();
      console.log('AuthContext - Profile update response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed');
      }

      console.log('AuthContext - Setting user after profile update:', data.user);
      setUser(data.user);

      // Fetch user data again to ensure we have the latest
      await fetchUser();

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Update user profile picture
   * @param {String} profilePicture - Profile picture URL or data URI
   * @returns {Promise<Object>} Update result
   */
  const updateProfilePicture = async (profilePicture) => {
    try {
      console.log('AuthContext - Updating profile picture');

      // Log the size of the profile picture data
      if (profilePicture) {
        console.log('AuthContext - Profile picture data size:', profilePicture.length);
      }

      const response = await fetch('/api/auth/profile/picture', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ profilePicture }),
        cache: 'no-store'
      });

      const data = await response.json();
      console.log('AuthContext - Profile picture update response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || 'Profile picture update failed');
      }

      console.log('AuthContext - Setting user after profile picture update:', data.user);

      // Update the user state with the new profile picture
      setUser(prevUser => ({
        ...prevUser,
        profilePicture: data.user.profilePicture
      }));

      // Fetch user data again to ensure we have the latest
      await fetchUser();

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Profile picture update error:', error);
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
    updateProfilePicture,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
