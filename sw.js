// PWABuilder Official Verified Service Worker for GitHub Pages
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "block-paint-final-v1";
const offlineFallbackPage = "/colour-io/index.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.routing) {
  workbox.routing.registerRoute(
    new RegExp('/colour-io/.*'),
    new workbox.strategies.NetworkFirst({
      cacheName: CACHE,
    })
  );
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(offlineFallbackPage);
      })
    );
  }
});
