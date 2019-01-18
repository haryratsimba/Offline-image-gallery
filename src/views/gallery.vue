<template>
  <div id="gallery">
    Gallery
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: []
    }
  },
  // Fetch the images when :category param changes
  watch: {
    '$route.params.category': function (category) {
      this.getImagesByCategory()
    }
  },
  created () {
    this.getImagesByCategory()
  },
  methods: {
    getImagesByCategory () {
      console.log(this.$route.params.category)
    }
  }
}
</script>
