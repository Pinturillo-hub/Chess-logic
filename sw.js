const CACHE_NAME = 'chess-study-v2';
const FILES_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './assets/images/rey.svg',
    './assets/images/dama.svg',
    './assets/images/torre.svg',
    './assets/images/alfil.svg',
    './assets/images/caballo.svg',
    './assets/images/reloj.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(resp => resp || fetch(event.request))
            .catch(() => caches.match('/index.html'))
    );
});
