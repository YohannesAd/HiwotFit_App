'use client';

/**
 * Client-side Providers Component
 *
 * This component wraps the application with necessary providers,
 * such as the AuthProvider for authentication state.
 */

import { AuthProvider } from './context/AuthContext';

/**
 * Providers component to wrap the application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Provider-wrapped children
 */
export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
