<template>
  <div>
    <navigation />

    <div class="progress">
      <div class="indeterminate" />
    </div>

    <router-view />
  </div>
</template>

<style scoped>
>>> .progress {
  margin-top: 0px;
}
</style>

<script>
import 'materialize-css/dist/css/materialize.min.css'

import Navigation from './navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>
