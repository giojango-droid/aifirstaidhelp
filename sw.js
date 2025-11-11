const CACHE_NAME = 'medical-assistant-cache-v1';
// This list includes the essential files for the app shell.
// Source files like .tsx are bundled into index.tsx by the build process,
// so we only need to cache the final output files.
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx', // This represents the bundled JS
  '/manifest.json',
  '/icon.svg', // Corrected path for the icon
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/client',
  'https://aistudiocdn.com/@google/genai@^1.29.0'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use addAll with a catch to prevent install failure if one asset fails
        return cache.addAll(URLS_TO_CACHE).catch(err => {
            console.error('Failed to cache initial assets:', err);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  // We only want to handle GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache, fetch from network
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200) {
              return response;
            }

            // We don't cache requests to the Gemini API
            if (event.request.url.includes('generativelanguage.googleapis.com')) {
                return response;
            }
            
            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(err => {
            console.error('Fetch failed; returning offline page instead.', err);
            // If the network fails, you could return an offline fallback page.
            // For this app, we will just let the browser's default offline error show.
        });
      })
    );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
