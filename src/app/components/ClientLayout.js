'use client';

import { useEffect, useState } from 'react';

/**
 * ClientLayout component
 * 
 * This component ensures that client-side rendering is properly handled
 * to prevent hydration errors. It only renders its children after
 * the component has mounted on the client.
 */
export default function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before mounting, render a placeholder with the same structure
  // but without any client-specific attributes or styles
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
