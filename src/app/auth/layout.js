'use client';

import { useEffect, useState } from 'react';

export default function AuthLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div suppressHydrationWarning>{children}</div>;
}