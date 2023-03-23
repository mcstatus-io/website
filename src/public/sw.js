const cacheName = 'mcstatus-v2';

const OFFLINE_URL = 'https://mcstatus.io/offline';

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(cacheName).then((cache) => fetch(OFFLINE_URL).then((result) => cache.put(OFFLINE_URL, result))));
});

self.addEventListener('fetch', (event) => {
	if (event.request.mode === 'navigate' && !navigator.onLine) {
		return event.respondWith(caches.open(cacheName).then((cache) => cache.match(OFFLINE_URL)));
	}

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