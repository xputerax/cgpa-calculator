var CACHE_NAME = 'cgpa-calculator-cache-v1';
const FILES_TO_CACHE = [
  '/index.html',
  '/offline.html',
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
        if (key !== CACHE_NAME) {
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