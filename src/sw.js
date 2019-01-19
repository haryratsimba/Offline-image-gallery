const cacheName = 'gallery-v1'

const { assets } = global.serviceWorkerOption

console.log(assets)

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
