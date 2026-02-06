const CACHE_NAME = 'bluetune-v13';

// Assets to cache for offline/hardened performance
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'https://esm.sh/@atproto/api@0.13.20'
];

// Install Event: Saves the app to the phone's internal storage
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Using allSettled to ensure one failing asset doesn't stop the install
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset))
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clears out old versions (v12 and below)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event: Serves the app from memory first (fastest)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
