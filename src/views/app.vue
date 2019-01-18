<template>
  <div>
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>
