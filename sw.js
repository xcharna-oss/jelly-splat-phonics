/* Offline cache. Bump CACHE when you change any file, so phones pick it up. */
const CACHE = 'jelly-splat-v1';
const CORE = ['./', './index.html', './voices.mp3', './manifest.json',
              './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(CORE); })
      .catch(function () { /* a missing file must not block install */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
                               .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/* Cache first, then network — so it opens with no signal, and anything new
   (fonts, the OCR language data) is kept for next time. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(function (c) {
            try { c.put(e.request, copy); } catch (err) { /* opaque or too big */ }
          });
        }
        return res;
      }).catch(function () { return hit; });
    })
  );
});
