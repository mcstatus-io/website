// const cacheName = 'mcstatus-v2';

self.addEventListener('install', (/* event */) => {
    // event.waitUntil(caches.open(cacheName));
});

self.addEventListener('fetch', (event) => {
    /* const url = new URL(event.request.url);

	if (!/^https?/.test(url.protocol) || !['127.0.0.1', 'localhost', 'mcstatus.io'].includes(url.hostname)) return;

	event.respondWith(
		caches.open(cacheName)
			.then((cache) => fetch(event.request)
				.then((fetchedResponse) => {
					cache.put(event.request, fetchedResponse.clone());

					return fetchedResponse;
				})
				.catch(() => cache.match(event.request))
			)); */

    event.respondWith(fetch(event.request));
});