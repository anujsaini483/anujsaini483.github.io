importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "block-paint-offline-v1";

if (workbox) {
  console.log(`Workbox is loaded 🎉`);
  
  workbox.routing.registerRoute(
    new RegExp('/colour-io/'),
    new workbox.strategies.NetworkFirst({
      cacheName: CACHE,
    })
  );
} else {
  console.log(`Workbox failed to load 😬`);
}
