const cacheName = "move-db";
const filesToCache = [
    "index.html",
    "style.css",
    "script.js",
    "manifest.json",
    "icon.png",
    "image.png"
];

// Install
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Fetch
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
