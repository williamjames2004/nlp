
const CACHE_NAME = "nlp-practical-v2";
const TEMP_CACHE = "nlp-practical-staging";
const BACKUP_CACHE = "nlp-practical-backup";

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

// Copy all entries from one cache to another
const copyCache = async (sourceName, destinationName) => {
    const source = await caches.open(sourceName);
    const destination = await caches.open(destinationName);
    const requests = await source.keys();

    for (const request of requests) {
        const response = await source.match(request);

        if (response) {
            await destination.put(request, response);
        }
    }
};

// Install and cache website files
self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);

        await Promise.all(FILES_TO_CACHE.map(async path => {
            const response = await fetch(path, {
                cache: "reload"
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to cache ${path}: ${response.status}`
                );
            }

            await cache.put(path, response);
        }));

        await self.skipWaiting();
    })());
});

// Activate the service worker
self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();

        await Promise.all(
            keys
                .filter(key =>
                    key.startsWith("nlp-practical-") &&
                    ![
                        CACHE_NAME,
                        TEMP_CACHE,
                        BACKUP_CACHE
                    ].includes(key)
                )
                .map(key => caches.delete(key))
        );

        await self.clients.claim();
    })());
});

// Receive the update request from index.html
self.addEventListener("message", event => {
    if (event.data?.type !== "UPDATE_CONTENT") {
        return;
    }

    const replyPort = event.ports[0];

    event.waitUntil((async () => {
        try {
            // Remove an incomplete staging cache from a previous attempt
            await caches.delete(TEMP_CACHE);

            // Download every current file into a separate cache
            const staging = await caches.open(TEMP_CACHE);

            await Promise.all(FILES_TO_CACHE.map(async path => {
                const response = await fetch(path, {
                    cache: "no-store",
                    headers: {
                        "X-SW-Update": "true"
                    }
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to download ${path}: HTTP ${response.status}`
                    );
                }

                await staging.put(path, response);
            }));

            // Save the existing cache as a backup
            await caches.delete(BACKUP_CACHE);

            const existingCache = await caches.open(CACHE_NAME);
            const existingRequests = await existingCache.keys();

            if (existingRequests.length > 0) {
                await copyCache(CACHE_NAME, BACKUP_CACHE);
            }

            // Replace the old cache only after downloads have succeeded
            await caches.delete(CACHE_NAME);

            try {
                await copyCache(TEMP_CACHE, CACHE_NAME);
                await caches.delete(TEMP_CACHE);
                await caches.delete(BACKUP_CACHE);

                replyPort?.postMessage({
                    success: true,
                    message: "All content updated successfully."
                });

            } catch (replacementError) {
                // Restore the old cache if replacement fails
                await caches.delete(CACHE_NAME);

                const backup = await caches.open(BACKUP_CACHE);
                const backupRequests = await backup.keys();

                if (backupRequests.length > 0) {
                    await copyCache(BACKUP_CACHE, CACHE_NAME);
                }

                throw replacementError;
            }

        } catch (error) {
            console.error("Cache update failed:", error);

            await caches.delete(TEMP_CACHE);

            replyPort?.postMessage({
                success: false,
                message: error.message || "Cache update failed."
            });
        }
    })());
});

// Serve cached files when offline
self.addEventListener("fetch", event => {
    const request = event.request;

    // Let update downloads reach the network directly
    if (request.headers.has("X-SW-Update")) {
        return;
    }

    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);

    // Handle only files from this website
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith((async () => {
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            return await fetch(request);
        } catch (error) {
            if (request.mode === "navigate") {
                const offlinePage = await caches.match("/index.html");

                if (offlinePage) {
                    return offlinePage;
                }
            }

            return new Response("File unavailable offline.", {
                status: 503,
                headers: {
                    "Content-Type": "text/plain; charset=utf-8"
                }
            });
        }
    })());
});