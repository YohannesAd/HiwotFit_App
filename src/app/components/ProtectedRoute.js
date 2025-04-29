'use client';

/**
 * Protected Route Component
 *
 * This component protects routes that require authentication.
 * It redirects unauthenticated users to the login page.
 */

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ProtectedRoute component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @returns {React.ReactElement|null} Children when authenticated, null when redirecting
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth check to complete
    if (loading) return;

    // Redirect to login if not authenticated
    if (!user) {
      router.push('/auth/login?callbackUrl=' + encodeURIComponent(window.location.href));
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Loading...
      </div>
    );
  }

  // Render children only when authenticated
  return user ? children : null;
};

export default ProtectedRoute;
