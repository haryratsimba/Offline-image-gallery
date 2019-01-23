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
          class="waves-effect waves-light btn"
          @click="addCategoryToCache"
        >
          Save for offline vizualisation
        </a>
        <!-- <a
          class="red btn"
          @click="clearCategoryFromCache"
        >
          Clear cache
        </a> -->
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
      images: []
    }
  },
  computed: {
    currentCategoryAPIURL () {
      return `https://pixabay.com/api/?key=11329549-fe0c285d676a88f0bc91f48ed&image_type=photo&category=${this.$route.params.category}&safesearch=true&per_page=10`
    },
    currentCategoryCacheName () {
      return `offline-api-${this.$route.params.category}`
    },
    isCacheAPIAvailable () {
      return 'caches' in window
    }
  },
  // Fetch the images when :category param changes
  watch: {
    '$route.params.category': function (category) {
      this.fetchImagesByCategory()
    }
  },
  created () {
    this.fetchImagesByCategory()
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
      console.log('Add current category images to the cache')

      this.isAddingCacheForOffline = true

      try {
        const response = await fetch(this.currentCategoryAPIURL)
        const cache = await caches.open(this.currentCategoryCacheName)

        cache.add(this.currentCategoryAPIURL, response.clone())

        console.log('Successfully added the request response to the cache !')
      } catch (e) {
        // Network error or bad request
        // TODO: Inform the user that the "add to cache" process has failed due to network issues
      } finally {
        this.isAddingCacheForOffline = false
      }
    },
    clearCategoryFromCache () {
      // TODO: Make sure to clear only images and not requests from the cache
      console.log('Clear current category images from the cache')
    }
  }
}
</script>
