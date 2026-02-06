const CACHE_NAME = 'skyline-v1';
const ASSETS = [
  'index.html',
  'https://cdn.jsdelivr.net/npm/@atproto/api@0.13.20/dist/bundle.js'
];

// Install and cache the library
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Intercept requests to make them "Internal"
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
