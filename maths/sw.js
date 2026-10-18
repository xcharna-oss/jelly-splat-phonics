/* Offline cache. Bump CACHE when you change any file, so phones pick it up. */
const CACHE = 'jelly-blocks-v2';
const CORE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) {
        /* 'reload' skips the browser's HTTP cache, which could otherwise hand
           back the previous index.html straight after a version bump. One file
           failing must not leave the new cache empty, so add them one by one. */
        return Promise.all(CORE.map(function (u) {
          return c.add(new Request(u, { cache: 'reload' })).catch(function () { /* missing: skip */ });
        }));
      })
      .catch(function () { /* no cache storage: still install */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        /* Only this app's old caches: Jelly Splat Phonics lives on the same
           site and keeps its own. */
        return Promise.all(keys.filter(function (k) { return k.indexOf('jelly-blocks-') === 0 && k !== CACHE; })
                               .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/* Cache first, then network, so it opens with no signal. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    /* This app's own cache only: caches.match() searches every cache on the
       site, so the other app's stale copy of a shared URL could win. */
    caches.open(CACHE).then(function (c) { return c.match(e.request); }).catch(function () { return null; }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(function (c) { return c.put(e.request, copy); })
            .catch(function () { /* full, or not cacheable */ });
        }
        return res;
      }).catch(function () { return Response.error(); });   /* offline, never cached */
    })
  );
});
