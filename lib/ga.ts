/**
 * Google Analytics 4 (gtag) helpers.
 *
 * Safe to import anywhere — all functions are no-ops when the measurement ID
 * is missing or when running on the server, so they never leak into server
 * rendering or break builds without an ID configured.
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in .env to enable.
 */

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XBSPMSMG8M';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push a command to the dataLayer. No-op if gtag isn't available yet. */
export function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Send a page_view hit. Call after client-side route changes. */
export function pageview(path: string): void {
  if (!MEASUREMENT_ID || typeof window === 'undefined') return;
  window.gtag?.('config', MEASUREMENT_ID, {
    page_path: path,
  });
}

/** Send a custom GA4 event, e.g. gaEvent('menu_item_click', { item: 'Ugali' }). */
export function gaEvent(
  action: string,
  params?: Record<string, unknown>,
): void {
  if (!MEASUREMENT_ID || typeof window === 'undefined') return;
  window.gtag?.('event', action, params);
}

export { MEASUREMENT_ID };
