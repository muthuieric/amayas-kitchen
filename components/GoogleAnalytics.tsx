'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/ga';

/**
 * Tracks client-side route changes for Google Analytics 4.
 * The core gtag.js script is rendered in RootLayout for instant initialization.
 * The initial page view is already sent by the layout's gtag('config') call, so
 * we only fire on subsequent client-side navigations to avoid double counting.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    pageview(pathname);
  }, [pathname]);

  return null;
}
