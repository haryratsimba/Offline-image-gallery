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

self.onactivate = event => {
  // This script will now be the active SW
  if (self.clients && self.clients.claim) {
    self.clients.claim()
  }

  // Clear images cache (don't update the global cache where the app specific files are loaded)
  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      console.log('Clear the existing cache', cacheNames)
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

  console.log('Fetch : ', event.request.url)

  if ('pixabay.com/api/'.includes(requestURL.hostname + requestURL.pathname)) {
    event.respondWith(getAPIResponse(event.request))
  } else if (requestURL.hostname === 'pixabay.com') {
    event.respondWith(getFromCache(event.request, './assets/imgs/no-image-placehoder.jpg'))
  } else {
    // Anything not related to the image provider should be fetch from the cache first, then from server. Do not try to update the cache
    event.respondWith(getFromCache(event.request))
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
 * 2) From the network. Don't update the cache
 * 3) If the "fallbackFromCache" argument is provided, return the fallback resource if the previous scenarios failed
 *
 * @param {*} request
 * @param {string} fallbackFromCache (generally a request url / resource location) that need to be used as fallback response (eg : a placeholder image)
 */
async function getFromCache (request, fallbackFromCache) {
  console.log('Trying to get the following resources from the cache :', request.url)

  const cachedResponse = await global.caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request, { cache: 'no-store' })

    /*
     * Pixabay images are served without cors-headers, so by default, fetch will use the "no-cors" option. The result is that the response is "Opaque"
     *(status is 0, statusText is empty, empty headers) and we don't really know if it failed or not. That is a risk when dealing with fetch
     * and resources served without cors-headers. Just assume it worked (https://filipbech.github.io/2017/02/service-worker-and-caching-from-other-origins
     */
    if (networkResponse.type !== 'opaque' && !networkResponse.ok && fallbackFromCache) {
      throw new Error(networkResponse.statusText)
    } else {
      return networkResponse.clone()
    }
  } catch (e) {
    const defaultReponse = await global.caches.match(fallbackFromCache)
    return defaultReponse
  }
}
