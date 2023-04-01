const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
const OFFLINE_URL = "https://todo-app-laskolaskov.vercel.app";

const staticAssets = [
    "/",
    "index.html",
    "todo-app-192.png",
    "todo-app-512.png",
    "vite.svg",
    "service-worker.js",
    "manifest.webmanifest"
];

async function getAssets() {
    try {
        const resp = await fetch("manifest.json")
        const data = await resp.json()
        //parse manifest.json and add the static assets
        return [...staticAssets, ...data['index.html']['css'], data['index.html']['file']]
    } catch (e) {
        return []
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const assets = await getAssets()
            await cache.addAll(assets);
        })()
    );
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            try {
                // First, try to use the navigation preload response if it's
                // supported.
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }

                // Always try the network first.
                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request.url);
                return cachedResponse;
            }
        })()
    );
});