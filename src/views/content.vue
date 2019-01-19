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
      images: [
        'https://pixabay.com/get/ea3cb20c2cfc003ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb20a28f3053ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb3092af3003ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb20e21fd083ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb20c2cf3093ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb20c2cfc013ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb20e21f5063ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb3062af5083ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb20d2bf6053ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg',
        'https://pixabay.com/get/ea3cb20928f0023ed1584d05fb1d4797e075ebd01db80c4090f4c671afebb4b9d0_1280.jpg'
      ]
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
    fetchImagesByCategory () {
      console.log(this.$route.params.category)
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
