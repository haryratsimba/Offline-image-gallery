<template>
  <div>
    <div
      v-show="isFillingCacheForOffline"
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
          class="waves-effect waves-light btn"
          @click="addImagesToCache"
        >
          Download for offline
        </a>
        <a
          class="red btn"
          @click="clearImagesFromCache"
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
      isFillingCacheForOffline: true,
      images: []
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
        const response = await fetch(`https://pixabay.com/api/?key=11329549-fe0c285d676a88f0bc91f48ed&image_type=photo&category=${this.$route.params.category}&safesearch=true&per_page=10`)
        const json = await response.json()

        this.images = json.hits.map(items => items.webformatURL)
      } catch (e) {
        console.log(e)
      }
    },
    addImagesToCache () {
      console.log('Add current category images to the cache')
    },
    clearImagesFromCache () {
      // TODO: Make sure to clear only images and not requests from the cache
      console.log('Clear current category images from the cache')
    }
  }
}
</script>
