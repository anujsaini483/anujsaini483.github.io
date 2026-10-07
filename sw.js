const CACHE_NAME = 'block-paint-offline-v8';

// Install event - turant skip karega taaki error na aaye
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event - control apne hath me lega
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch event - network se laayega aur sath hi sath cache me save karta jayega
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
