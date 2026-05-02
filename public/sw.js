const APP_SHELL_CACHE = 'poke-binder-shell-v1';
const IMAGE_CACHE = 'poke-binder-images-v1';

const APP_SHELL_PATTERNS = [
  '/',
  '/binder',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll(APP_SHELL_PATTERNS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== APP_SHELL_CACHE && name !== IMAGE_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  const IMAGE_HOSTS = [
    'images.pokemontcg.io',
    'images.production.sportscardinvestor.com',
    'tcgplayer-cdn.tcgplayer.com',
    'limitlesstcg.nyc3.cdn.digitaloceanspaces.com',
  ];
  if (IMAGE_HOSTS.includes(url.hostname)) {
    // Use the plain URL as cache key so cors and no-cors requests
    // (warmup fetch vs <img> tag) always hit the same entry.
    const cacheKey = url.href;
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(cacheKey).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Try cors first (gives a cacheable response with ok:true).
          // Fall back to no-cors for CDNs without CORS headers —
          // the opaque response is still usable by <img> tags.
          return fetch(cacheKey, { mode: 'cors' })
            .catch(() => fetch(event.request))
            .then((networkResponse) => {
              if (networkResponse.ok || networkResponse.type === 'opaque') {
                cache.put(cacheKey, networkResponse.clone());
              }
              return networkResponse;
            });
        });
      })
    );
    return;
  }

  if (url.hostname !== self.location.hostname) return;

  const pathname = url.pathname;

  if (pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }

  if (event.request.mode === 'navigate' && pathname.startsWith('/binder/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/').then((shellResponse) => {
          return shellResponse || new Response('Offline', { status: 503 });
        });
      })
    );
    return;
  }

  if (pathname === '/' || pathname.startsWith('/binder')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
