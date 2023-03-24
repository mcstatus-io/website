const cacheName = 'mcstatus-v2';

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(cacheName));
});

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.open(cacheName).then(async (cache) => {
		return fetch(event.request).then((fetchedResponse) => {
			if (/^https?/.test(new URL(event.request.url).protocol)) {
				cache.put(event.request, fetchedResponse.clone());
			}

			return fetchedResponse;
		}).catch(() => {
			return cache.match(event.request.url);
		});
	}));
});