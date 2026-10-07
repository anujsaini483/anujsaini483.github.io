const CACHE_NAME = 'block-paint-v6';

// Service Worker Install
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Service Worker Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch handler for offline support
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        return response;
      }).catch(() => {
        // Agar offline hain aur page load karna ho toh index.html dega
        if (event.request.mode === 'navigate') {
          return caches.match('/colour-io/index.html');
        }
      });
    })
  );
});
