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
      <div class="col s12 right-align">
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
    </div>
  </div>
</template>

<style>
  #gallery {
    margin-top: 50px;
  }
</style>

<script>
export default {
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
