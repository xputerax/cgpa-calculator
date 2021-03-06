var CACHE_NAME = 'cgpa-calculator-cache-v1';
const FILES_TO_CACHE = [
  '/index.html',
  '/offline.html',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-256x256.png',
  '/images/icons/icon-512x512.png',
  '/app.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css',

];

self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  )
})

self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
})

self.addEventListener('fetch', function (evt) {
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            // return cache.match('offline.html');
            return cache.match('index.html');
          });
      })
  );
})