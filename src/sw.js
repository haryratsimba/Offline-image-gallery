const cacheName = 'gallery-v1'

// Cache static resources needed to display the app offline
self.oninstall = event => {
  // Make sure resources are cached to complete the installation
  event.waitUntil(
    global.caches.open(cacheName).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './index.js',
        './vue.js',
        './assets/imgs/no-image-placehoder.jpg'
      ])
    })
  )
}

self.onfetch = event => {
  event.respondWith(
    // Return cache resources, including app files registred in the installation phase
    caches.match(event.request).then(response => {
      if (response) {
        return response
      } else {
        // The resource is not cached
        // Fetch only app caches files and API requests
        // not images, as it may take some space. The user should have the control over its image storage

        console.log('Need to fetch the API and cache the response, then return the response')
        // TODO: Check the URL to cache only API requests, not imgs
      }
    })
  )
}
