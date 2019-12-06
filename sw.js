var CACHE_NAME = 'simple-PWA';
var urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/contact.html',
  '/storeLocator.html',
  '/unsemantic-grid-responsive-tablet.css',
  '/stylesheet.css',
  '/bootstrap.css',
  '/bootstrap.js',

  //not sure if needed
  '/green.png',
  '/greenBanner',
  '/recycle.png',
  '/reuse.png',
  '/scrap.png',
  '/Thumbs.db',
  '/banner.jpg'
];

self.addEventListener('install', function(event)) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
};

self.addEventListener('fetch', function(event)) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response)) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        }
      );
    })
  );
};
