const CACHE_NAME = 'bluetune-cache-v1';
// This version uses relative paths (./) to find your files regardless of the URL
const ASSETS = [
  './',
  'index.html',
  'index.min.js',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Adding assets one by one so one failure doesn't break the whole thing
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
