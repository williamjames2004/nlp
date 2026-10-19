const CACHE_NAME = "nlp-practical-v2";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/css/bootstrap.min.css",
    "/js/bootstrap.bundle.min.js",

    // Exercise 1
    "/assets/1/1.py",
    "/assets/1/2.py",
    "/assets/1/3.py",
    "/assets/1/4.py",
    "/assets/1/output1.txt",
    "/assets/1/output2.txt",
    "/assets/1/output3.txt",
    "/assets/1/output4.txt",

    // Exercise 2
    "/assets/2/1.py",
    "/assets/2/2.py",
    "/assets/2/3.py",
    "/assets/2/4.py",
    "/assets/2/output1.txt",
    "/assets/2/output2.txt",
    "/assets/2/output3.txt",
    "/assets/2/output4.txt",

    // Exercise 3
    "/assets/3/1.py",
    "/assets/3/2.py",
    "/assets/3/3.py",
    "/assets/3/4.py",
    "/assets/3/output1.txt",
    "/assets/3/output2.txt",
    "/assets/3/output3.txt",
    "/assets/3/output4.txt",
    "/assets/3/sample.txt",
    "/assets/3/positive/positive.txt",
    "/assets/3/negative/negative.txt",

    // Exercise 4
    "/assets/4/1.py",
    "/assets/4/2.py",
    "/assets/4/3.py",
    "/assets/4/4.py",
    "/assets/4/output1.txt",
    "/assets/4/output2.txt",
    "/assets/4/output3.txt",
    "/assets/4/output4.txt",

    // Exercise 5
    "/assets/5/1.py",
    "/assets/5/2.py",
    "/assets/5/3.py",
    "/assets/5/4.py",
    "/assets/5/output1.txt",
    "/assets/5/output2.txt",
    "/assets/5/output3.txt",
    "/assets/5/output4.txt",

    // Exercise 6
    "/assets/6/1.py",
    "/assets/6/2.py",
    "/assets/6/3.py",
    "/assets/6/4.py",
    "/assets/6/output1.txt",
    "/assets/6/output2.txt",
    "/assets/6/output3.txt",
    "/assets/6/output4.txt",

    // Exercise 7
    "/assets/7/1.py",
    "/assets/7/2.py",
    "/assets/7/3.py",
    "/assets/7/4.py",
    "/assets/7/output1.txt",
    "/assets/7/output2.txt",
    "/assets/7/output3.txt",
    "/assets/7/output4.txt"
];

// Install and cache website files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            const results = await Promise.allSettled(
                FILES_TO_CACHE.map(async path => {
                    const response = await fetch(path, {
                        cache: "reload"
                    });

                    if (!response.ok) {
                        throw new Error(
                            `Failed to cache ${path}: ${response.status}`
                        );
                    }

                    await cache.put(path, response);
                })
            );

            const failed = results
                .map((result, index) => ({ result, path: FILES_TO_CACHE[index] }))
                .filter(item => item.result.status === "rejected");

            if (failed.length > 0) {
                console.error(
                    "Some files could not be cached:",
                    failed.map(item => item.path)
                );

                throw new Error(
                    `${failed.length} website file(s) failed to cache.`
                );
            }

            await self.skipWaiting();
        })
    );
});

// Activate the new cache and remove older versions
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(async keys => {
            await Promise.all(
                keys
                    .filter(key =>
                        key.startsWith("nlp-practical-") &&
                        key !== CACHE_NAME
                    )
                    .map(key => caches.delete(key))
            );

            await self.clients.claim();
        })
    );
});

// Serve cached files when offline
self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    // Handle only files hosted on this website
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request).catch(() => {
                if (request.mode === "navigate") {
                    return caches.match("/index.html");
                }

                return new Response("File unavailable offline.", {
                    status: 503,
                    headers: {
                        "Content-Type": "text/plain; charset=utf-8"
                    }
                });
            });
        })
    );
});