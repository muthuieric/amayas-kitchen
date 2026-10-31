/*
 * Amayas Swahili Kitchen - minimal offline-first service worker.
 * Dependency-free. Strategy:
 *   - Navigations: network-first, fall back to cached home when offline.
 *   - Static assets (_next/static, icons, images): stale-while-revalidate.
 * Admin, API and the Next image optimizer are intentionally never cached.
 */
const CACHE = "amayas-v1";
const PRECACHE = [
  "/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never touch admin, API routes or the Next.js image optimizer.
  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next/image")
  ) {
    return;
  }

  // Page navigations: network-first with cached-home fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("/").then(
          (cached) =>
            cached ||
            new Response("You are offline. Please reconnect to continue.", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            }),
        ),
      ),
    );
    return;
  }

  // Everything else (static assets, icons, images): stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
