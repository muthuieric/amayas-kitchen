'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/ga';

/**
 * Tracks client-side route changes for Google Analytics 4.
 * The core gtag.js script is rendered in RootLayout for instant initialization.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  return null;
}
