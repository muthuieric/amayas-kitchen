'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { pageview } from '@/lib/ga';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 client component.
 *
 * Loads the gtag script once, initializes GA4, and sends a page_view on mount
 * and every time the pathname changes (client-side navigation).
 *
 * Only active when NEXT_PUBLIC_GA_MEASUREMENT_ID is set — leave it unset in
 * local development to avoid polluting production reports.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return;

    const scriptId = `gtag-${gaId}`;

    const gtag = (window.gtag = (...args: unknown[]) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    });

    gtag('js', new Date());

    // Script already loaded from a previous render: just report this route.
    if (document.getElementById(scriptId)) {
      pageview(pathname);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.onload = () => {
      window.gtag?.('config', gaId, { page_path: pathname });
    };
    document.head.appendChild(script);
  }, [gaId, pathname]);

  return null;
}
