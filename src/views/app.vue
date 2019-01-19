<template>
  <div>
    <navigation />
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

// Service Worker runtime, provided by serviceworker-webpack-plugin
import runtime from 'serviceworker-webpack-plugin/lib/runtime'

export default {
  name: 'App',
  components: {
    Navigation
  },
  created () {
    if ('serviceWorker' in navigator) {
      runtime.register().then(reg => {
        console.log('Registration succeed')
      }).catch(err => {
        console.log('Registration failed with : ', err)
      })
    }
  }
}
</script>
