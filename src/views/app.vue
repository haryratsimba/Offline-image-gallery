<template>
  <div>
    <navigation />
    <router-view />
  </div>
</template>

<style>
  body {
    padding: 10px 80px;
  }
</style>

<script>
import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-icons.min.css'

import Navigation from './navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>
