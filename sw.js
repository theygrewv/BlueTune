const CACHE_NAME = 'bluetune-v1';

// The Master Assets List
const ASSETS = [
  './',
  'index.html',
  'library.js',
  'manifest.json',
  'https://cdn-icons-png.flaticon.com/512/3658/3658959.png'
];

// Install Event: Saves everything to your phone's memory
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Using allSettled so one failed icon doesn't break the whole app
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset))
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Cleans up old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event: Serves the app from memory for speed and security
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
