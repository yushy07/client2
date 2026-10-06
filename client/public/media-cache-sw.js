const CACHE_NAME = "jaymurti-media-v1";
const IMAGE_PATH = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("jaymurti-media-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "PREFETCH_MEDIA" || !Array.isArray(event.data.urls)) return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const value of event.data.urls) {
      const url = new URL(value, self.location.origin);
      if (url.origin !== self.location.origin || !IMAGE_PATH.test(url.pathname) || await cache.match(url.href)) continue;
      try {
        const response = await fetch(url.href);
        if (response.ok && response.type === "basic") await cache.put(url.href, response);
      } catch { /* Keep prefetch failures from affecting the page. */ }
    }
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !IMAGE_PATH.test(url.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    const refresh = fetch(request).then((response) => {
      if (response.ok && response.type === "basic") void cache.put(request, response.clone());
      return response;
    }).catch(() => cached);
    return cached || refresh;
  })());
});
