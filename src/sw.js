const globalCacheName = 'gallery-v1'

// Cache entries such as API response or images will start with a predefined prefix. If will be easier to clean the cache based on the prefix
const apiCachePrefix = 'offline-api-'

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
        cacheNames.filter(cacheName => cacheName.includes(apiCachePrefix)).map(cacheName => caches.delete(cacheName))
      )
    })
  )
}

/*
 * Intercept fetch requests using the following rules :
 * Always check the event request url
 * - Network first for api requests to get the most recent content (images are sorted by popularity). If it fails, load from the cache
 * - Cache first for any others requests (static resources such as images, scripts etc.)
 *  - If images are not available (eg : server or network issues), make sure to load a placeholder image that must be available in the cache
 */
self.onfetch = event => {
  const requestURL = new URL(event.request.url)

  console.log('Fetch : ', event.request.url)

  if ('pixabay.com/api/'.includes(requestURL.hostname + requestURL.pathname)) {
    event.respondWith(getAPIContent(event.request))
  } else if (requestURL.hostname === 'pixabay.com') {
    event.respondWith(getContentFromCache(event.request, './assets/imgs/no-image-placehoder.jpg'))
  } else {
    // Anything not related to the image provider should be fetch from the cache first, then from server. Do not try to update the cache
    event.respondWith(getContentFromCache(event.request))
  }
}

/**
 * Get API data from the server. If if fails, get data from the cache.
 *
 * @param {*} request
 */
async function getAPIContent (request) {
  try {
    // Append a timestamp to the url to prevent the browser from caching API requests
    let response = await fetch(request.url + '&' + (+new Date()))

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response
  } catch (e) {
    return caches.match(request)
  }
}

/*
 * Retrieve static content (eg : images, scripts etc.) in the following order :
 * 1) From the cache
 * 2) From the network. Don't update the cache
 * 3) If the "fallbackFromCache" argument is provided, return the fallback resource if the previous scenarios failed
 *
 * @param {*} request
 * @param {string} fallbackFromCache (generally a request url / resource location) that need to be used as fallback response (eg : a placeholder image)
 */
async function getContentFromCache (request, fallbackFromCache) {
  console.log('Trying to get the following resources from the cache :', request.url)

  const cachedResponse = await global.caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    // Explicitely append the timestamp to the image url to prevent the browser from caching the image
    const networkResponse = await fetch(request.url + '&' + (+new Date()))

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
