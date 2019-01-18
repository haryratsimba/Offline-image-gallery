<template>
  <div>
    <navigation />
    <router-view />
  </div>
</template>

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
