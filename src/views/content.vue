<template>
  <div>
    <div
      v-show="isAddingCacheForOffline"
      class="progress"
    >
      <div class="indeterminate" />
    </div>
    <div
      id="gallery"
      class="container"
    >
      <!-- Actions -->
      <div
        id="gallery-actions"
        class="col s12 right-align"
      >
        <a
          v-if="isCacheAPIAvailable"
          :class="`waves-effect waves-light btn ${isCurrentCategoMarkedAsCached ? 'disabled' : ''}`"
          @click="addCategoryToCache"
        >
          Save for offline vizualisation
        </a>
        <a
          class="red btn"
          @click="clearCategoryFromCache"
        >
          Clear cache
        </a>
      </div>

      <!-- Image gallery -->
      <div id="gallery-container">
        <gallery-grid
          :imgs="images"
          :cols-per-row="3"
        />
      </div>
    </div>
  </div>
</template>

<style>
  #gallery,
  #gallery-container {
    margin-top: 50px;
  }
</style>

<script>
import GalleryGrid from '@/components/galleryGrid'

export default {
  components: {
    GalleryGrid
  },
  data () {
    return {
      isAddingCacheForOffline: false,
      // Is the current gallery category content is cached
      isCurrentCategoMarkedAsCached: false,
      images: []
    }
  },
  computed: {
    currentCategoryAPIURL () {
      return `https://pixabay.com/api/?key=11329549-fe0c285d676a88f0bc91f48ed&image_type=photo&category=${this.$route.params.category}&safesearch=true&per_page=10`
    },
    // Each category has its own cache entry because the user can cache specific categories.
    // It allows to clear from the cache specific images per category before fetching the lastest images from the server
    currentCategoryCacheName () {
      return `offline-api-${this.$route.params.category}`
    },
    currentCategoryImgCacheName () {
      return `offline-img-${this.$route.params.category}`
    },
    isCacheAPIAvailable () {
      return 'caches' in window
    }
  },
  // Fetch the images when /gallery :category param changes
  watch: {
    '$route.params.category': function (category) {
      this.isCurrentCategoMarkedAsCached = this.isCategoryMarkedAsCached()

      this.fetchImagesByCategory()
    }
  },
  created () {
    this.fetchImagesByCategory()
  },
  mounted () {
    this.isCurrentCategoMarkedAsCached = this.isCategoryMarkedAsCached()
  },
  methods: {
    async fetchImagesByCategory () {
      try {
        const response = await fetch(this.currentCategoryAPIURL)
        const json = await response.json()

        this.images = json.hits.map(items => items.webformatURL)
      } catch (e) {
        console.log(e)

        // Use placeholder image available in the cache. Each category is composed of 10 images
        this.images = [...Array(10)].map(() => '/assets/imgs/no-image-placehoder.jpg')
      }
    },
    async addCategoryToCache () {
      this.isAddingCacheForOffline = true

      try {
        const response = await fetch(this.currentCategoryAPIURL)
        const json = await response.clone().json()

        // Cache all images received from the API response. addAll fetch automatically the resource from the server and cache
        const imgCache = await caches.open(this.currentCategoryImgCacheName)

        await imgCache.addAll(json.hits.map(img => img.webformatURL))

        // Cache the API request / response after fetching from the server
        const categoryCache = await caches.open(this.currentCategoryCacheName)
        await categoryCache.put(this.currentCategoryAPIURL, response.clone())

        this.markCategoryAsCached()

        console.log(`Successfully added "${this.$route.params.category}" category content to the cache !`)
      } catch (e) {
        // Network error or bad request
        // TODO: Inform the user that the "add to cache" process has failed due to network issues
        console.log(`Category caching couldn't be proceed`, e)
      } finally {
        this.isAddingCacheForOffline = false
      }
    },
    clearCategoryFromCache () {
      // TODO: Clear requests + images from the cache for the current category
      console.log('Clear current category images from the cache')

      this.unmarkCategoryAsCached()
    },
    // Use the local storage to keep track of cached category
    // This allows us to enabled / disable the "Save for offline..." button
    markCategoryAsCached () {
      localStorage.setItem(this.$route.params.category, true)
      this.isCurrentCategoMarkedAsCached = true
    },
    unmarkCategoryAsCached () {
      localStorage.removeItem(this.$route.params.category)
      this.isCurrentCategoMarkedAsCached = false
    },
    isCategoryMarkedAsCached () {
      return this.$route.params.category in localStorage
    }
  }
}
</script>
