self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('secret-santa-cache').then(cache => {
      return cache.addAll(['./', './index.html', './reindeer.png']);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
