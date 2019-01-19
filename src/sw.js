const cacheName = 'gallery-v1'

// Cache static resources needed to display the app offline
self.oninstall = event => {
  // Make sure resources are cached to complete the installation
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/vue.js'
      ])
    })
  )
}
