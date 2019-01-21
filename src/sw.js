const globalCacheName = 'gallery-v1'
const apiCacheName = 'api'

// Cache static resources needed to display the app offline
self.oninstall = event => {
  // Make sure resources are cached to complete the installation
  event.waitUntil(
    global.caches.open(globalCacheName).then(cache => {
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

self.activate = event => {
  // This script will now be the active SW
  if (self.clients && self.clients.claim) {
    self.clients.claim()
  }

  // Clear images cache (don't update the global cache where the app specific files are loaded)
  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      // Delete api cache entries
      return Promise.all(
        cacheNames.filter(cacheName => cacheName === apiCacheName).map(cacheName => caches.delete(cacheName))
      )
    })
  )
}

/*
 * Intercept fetch requests using the following rules :
 * Always check the event request url
 * - Get app specific resources from the cache
 * - Always try to fetch the "GET images urls" request from the server because photos are filtered by popularity, which may change everyday
 *   - If it fails, pick from the cache
 * - Do not cache images resources to save storage space. Let the user save on-demand the images in the cache
 */
self.onfetch = event => {
  const requestURL = new URL(event.request.url)

  console.log(requestURL)

  if ('pixabay.com/api/'.includes(requestURL.hostname + requestURL.pathname)) {
    event.respondWith(getAPIResponse(event.request))
  } else if (requestURL.hostname === 'pixabay.com') {
    event.respondWith(getImagesFromCache(event.request))
  } else {
    // Anything not related to the image provider should be fetch from the cache first
    event.respondWith(caches.match(event.request))
  }
}

/**
 * Get API data from the server and update the cache.
 * If if fails, get data from the cache.
 *
 * @param {*} request
 */
async function getAPIResponse (request) {
  try {
    let response = await fetch(request)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const cache = await global.caches.open(apiCacheName)
    cache.put(request, response.clone())

    return response
  } catch (e) {
    return caches.match(request)
  }
}

/*
 * Retrieve image in the following order :
 * 1) From the cache
 * 2) From the network
 * 3) Return a placeholder image if the previous scenarios failed
 *
 * @param {*} request
 */
async function getImagesFromCache (request) {
  const cachedResponse = await global.caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (!networkResponse.ok) {
      throw new Error(networkResponse.statusText)
    }
  } catch (e) {
    const defaultReponse = await global.caches.match('./assets/imgs/no-image-placehoder.jpg')
    return defaultReponse
  }
}
